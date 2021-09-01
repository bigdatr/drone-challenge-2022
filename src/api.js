const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json({limit: "1MB"}));
//defining limit since would refault to limit being too small for required input

// post request used so can create body to handle large input size, as opposed to query in url
// response made up of success flag, as well as both one and two drone results where applicable
app.post('/clickOneDrone', (req, res) => {
    //post req for commands being sent to one drone: Part 1
    let str = req.body.input;
    let response = singleDroneReader(str);
    res.json(response);
});
app.post('/clickTwoDrones', (req, res) => {
    //post req for commands being sent to two drones: Part 2
    let str = req.body.input;
    let response = doubleDroneReader(str);
    res.json(response);
});
app.post('/clickBothOptions', (req, res) => {
    // showing Part 1 and Part 2 results
    let str = req.body.input;
    const responseSingle = singleDroneReader(str);
    const responseDouble = doubleDroneReader(str);
    let response = {
        "success" : true,
        "billboardsPhotographedSingle" : "",
        "billboardsPhotographedDouble" : ""
    }
    if(!responseSingle.success || !responseDouble.success) {
        response.success = false;
    }
    else {
        response.billboardsPhotographedSingle = responseSingle.billboardsPhotographedSingle;
        response.billboardsPhotographedDouble = responseDouble.billboardsPhotographedDouble;
    }
    res.json(response);
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

// found had to use two separate functions for both parts as specified commands would have to be different for each drone

function singleDroneReader(req) {
    const commandArray = req.split("");
    let picArr = [];
    let drone = new Drone(0, 0);
    for(i = 0; i < commandArray.length; i++) {
        switch(commandArray[i]) {
            case "x":
                let position = drone.positionString();
                if (!picArr.includes(position)) {
                    picArr.push(position)
                }
                //take photo
                break;
            case "^":
                drone.moveUp();
                break;
            case "v":
                drone.moveDown();
                break;
            case "<":
                drone.moveLeft();
                break;
            case ">":
                drone.moveRight();
                break;
            default:
                return {
                    "success" : false
                }
        }
    }
    const picsTaken = {
        "success" : true,
        "billboardsPhotographedSingle" : "There are " + picArr.length + " unique billboards captured with these commands for one drone deployed.",
        "billboardsPhotographedDouble" : ""
    };
    return picsTaken;
}

function doubleDroneReader(req) {
    const commandArray = req.split("");
    let picArr = [];
    let drone1 = new Drone(0, 0);
    let drone2 = new Drone(0, 0);
    let droneCommand1 = true;
    let droneCommand2 = false;
    for(i = 0; i < commandArray.length; i++) {
        if(i%2) {
            droneCommand1 = false;
            droneCommand2 = true;
        }
        else {
            droneCommand1 = true;
            droneCommand2 = false;
        }
        switch(commandArray[i]) {
            case "x":
                let positionDrone1 = drone1.positionString();
                let positionDrone2 = drone2.positionString();
                if (!picArr.includes(positionDrone1) && !picArr.includes(positionDrone2)) {
                    if(droneCommand1 && !droneCommand2) {
                        picArr.push(positionDrone1);
                    }
                    else {
                        picArr.push(positionDrone2);
                    }
                }
                //take photo
                break;
            case "^":
                if(droneCommand1 && !droneCommand2) {
                    drone1.moveUp();
                }
                else {
                drone2.moveUp();
                }
                break;
            case "v":
                if(droneCommand1 && !droneCommand2) {
                    drone1.moveDown();
                }
                else {
                drone2.moveDown();
                }
                break;
            case "<":
                if(droneCommand1 && !droneCommand2) {
                    drone1.moveLeft();
                }
                else {
                drone2.moveLeft();
                }
                break;
            case ">":
                if(droneCommand1 && !droneCommand2) {
                    drone1.moveRight();
                }
                else {
                drone2.moveRight();
                }
                break;
            default:
                return {
                    "success" : false
                }
        }
    }
    const picsTaken = {
        "success" : true,
        "billboardsPhotographedSingle" : "",
        "billboardsPhotographedDouble" : "There are " + picArr.length + " unique billboards captured with these commands for two drones deployed."
    };
    return picsTaken;
}

// generated Drone class to define position of each drone as well as results of a command for movement
class Drone {
    constructor (xPosition, yPosition) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }
    positionString() {
        return "(" + this.xPosition + "," + this.yPosition + ")";
    }
    moveUp() {
        this.yPosition +=1;
    }
    moveDown() {
        this.yPosition -=1;
    }
    moveLeft() {
        this.xPosition -=1;
    }
    moveRight() {
        this.xPosition +=1;
    }
}

