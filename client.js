import React from 'react';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';

/********
 * Drone piloting program
 * Developed by @lkdm as programming challenge for BigDatr.
 * 
 */

// Blank drone, x and y location relative to starting location
const DRONE = {x: 0, y: 0}

const App = () => {
    const {isLoading, data} = useFetch('http://localhost:4001');
    if(isLoading) {
        return 'Loading...'
    }

    const clickHandler = (e) => {
        /*
        - Send instructions to drone, when user presses submit
        - Then renders the answer
        */

        // Create the instruction set
        const instructions = getInstructions()
        const queue = createQueue(instructions)

        // Guard: Verify legal moves
        if (!sanitiseInput(queue)) {
            alert("Warning: You included instructions that are not recognised by the drone. Valid instructions: 'v^<>'.")
            return
        }
        
        // Part 1: Unique billboards photographed
        // Pilot one drone
        const billboardsPhotographed = runDroneCommand(queue).billboardsPhotographed
        const answer = "Unique billboards photographed with one drone: " + billboardsPhotographed
        document.getElementById("part1").innerHTML = answer

        // Part 2: Unique billboards photographed, assuming two drones with interleaving instruction sets
        let droneA = []
        let droneB = []

        // Separate interleaved instruction set.
        for (const i in queue) {
            if (i % 2 == 0) { // Odd: Drone A
                droneA.push(queue[i])
            } else { // Even: Drone B
                droneB.push(queue[i])
            }
        }

        // Pilot drones
        const droneATally = runDroneCommand(droneA).tally
        const droneBTally = runDroneCommand(droneB).tally
        // Fresh tally
        let tally = {}

        // Merge tallies
        for (const key in droneATally) {
            tally[key] = 1
        }
        for (const key in droneBTally) {
            tally[key] = 1
        }

        // Count unique billboards
        let sum = 0
        for (const key in tally) {
            sum +=1
        }

        // Render answer
        const answerPart2 = "Unique billboards photographed with two drones: " + sum
        document.getElementById("part2").innerHTML = answerPart2

    }
    
    return (
        <div id="content">
            <h1>Blue Flag Drone Pilot</h1>
            <h2>Console</h2>
            <form>
                <input type="text" id="instructions" placeholder="Input drone instructions" />
                <input type="button" value="Send" onClick={clickHandler} />
            </form>
            <h2>Output</h2>
            <div id="answer">
                <p id="part1"></p>
                <p id="part2"></p>
            </div>
        </div>
    )
}


/* Functions */

function runDroneCommand(queue) {
    // Runs an entire drone command from start to finish.
    // Takes a set of instructions (queue)
    // Returns number of billoards photographed.

    // Pilot the drone
    const droneData = pilotDrone(queue)
    // Grab the data from the drone
    const newLocation = droneData.droneLocation
    const photoLocations = droneData.photoLocations

    // Tally photo locations
    const tallyRecord = tallyPhotoLocations(photoLocations)
    const billboardsPhotographed = tallyRecord.uniqueLocationsPhotographed // Part 1 answer
    const tally = tallyRecord.tally

    return {billboardsPhotographed, tally}
}

function sanitiseInput(queue) {
    // Check that input is a legal instruction set
    const legalMoves = "xv^><"

    // Check that each instruction is legal
    for (const i in queue) {
        const instruction = queue[i]
        if (!legalMoves.includes(instruction)) {
            return false
        }
    }
    return true
}

function pilotDrone(queue) {
    // Takes an instruction set
    // Returns an object with the new drone location, and list of photo locations.

    // Create new drone
    let userDrone = DRONE
    // Store photo geolocation metadata
    let photoLocations = []

    // Pilot the drone autonymously
    for (const i in queue) {
        const instruction = queue[i]

        // Navigation handling
        if (instruction == "^") {
            // 1km North
            userDrone.y -= 1
        } else if (instruction == "v") {
            // 1km South
            userDrone.y += 1
        } else if (instruction == "<") {
            // 1km West
            userDrone.x -= 1
        } else if (instruction == ">") {
            // 1km East
            userDrone.x += 1
        } else {
            // Store photo location
            photoLocations.push({x: userDrone.x, y: userDrone.y})
            // Because objects are pass-by-reference, a new one must be constructed here;
            // Because otherwise, it would overwrite previous photo locations.
        }
    }

    // Return new drone location, and list of photo locations
    return {droneLocation: userDrone, photoLocations: photoLocations}
}

function tallyPhotoLocations(photoLocations) {
    // Create a tally how many times each billboard was photographed
    // Returns an object with a tally, and number of billboards photographed at least once.
    let tally = {}
    let uniqueLocationsPhotographed = 0

    for (const i in photoLocations) {
        const location = photoLocations[i]
        // Strings are easier to work with than objects as keys for a dictionary
        const locationRecord = location.x + ", " + location.y

        if (tally[locationRecord]) {
            // If there is a tally record, add one
            tally[locationRecord] += 1

        } else {
            // If there is no tally record, create it
            tally[locationRecord] = 1
            // Then increment the list of billboards
            uniqueLocationsPhotographed += 1
        }

    }
    return {tally, uniqueLocationsPhotographed}
}


function getInstructions() {
    // Gets instructions from text input, then clears it
    // Side effects: resets input value
    const instructionInput = document.getElementById("instructions")
    const instructions = instructionInput.value
    instructionInput.value = ""
    return instructions
}

function createQueue (str) {
    // Create a queue of drone instructions from a string
    return str.split("")
}

ReactDOM.render(<App />, document.getElementById('app'));
