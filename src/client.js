import React, { useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import useFetch from 'react-fetch-hook';
import axios from 'axios';
// had a preference to use axoios for post request so imported library


function App() {
    // simple app created such that request string shows and based on input into textbox, as well as option clicked, results show accordingly
    let requestString = "Please input your drone commands below and click the appropriate to determine the amount of unique billboards captured:";
    const [text, setText] = useState("");
    const [billboardResponseOneDrone, setBillboardResponseOneDrone] = useState("");
    const [billboardResponseTwoDrones, setBillboardResponseTwoDrones] = useState("");
    const onClick = async (event) => {
        let requestURL = 'http://localhost:4001/' + event.target.id;
        const response = await axios.post(requestURL, {input: text});
        if (response.data.success) {
            if(response.billboardsPhotographedSingle != 0) {
                setBillboardResponseOneDrone(response.data.billboardsPhotographedSingle);
            } else {
                setBillboardResponseOneDrone("N/A");
            }
            if(response.billboardsPhotographedDouble != 0) {
                setBillboardResponseTwoDrones(response.data.billboardsPhotographedDouble);
            } else {
                setBillboardResponseTwoDrones("N/A");
            }
        }
        else {
            // set error response for when a command that is not recognised is inputted into textbox
            setBillboardResponseOneDrone("The commands you put in contain some values that are undefined. Please check your input and try again.");
            setBillboardResponseTwoDrones("");

        }
    }
    // textarea element used for input since value can be extremely large so helps with visibility
    return  <div>
                <h1>{requestString}</h1>
                <textarea id = "commandString" value = {text} onChange = {(e) => {setText(e.target.value)}}/>
                <br/>
                <button id = "clickOneDrone" onClick = {onClick}>One Drone Option</button>
                <br/>
                <button id = "clickTwoDrones" onClick = {onClick}>Two Drones Option</button>
                <br/>
                <button id = "clickBothOptions" onClick = {onClick}>Both Options</button>
                <br/>
                <h2>{billboardResponseOneDrone}</h2>
                <h2>{billboardResponseTwoDrones}</h2>
            </div>
}

ReactDOM.render(<App />, document.getElementById('app'));


