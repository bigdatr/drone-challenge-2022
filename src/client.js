import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const [commands, setCommands] = useState();
  const [twoDroneToggle, setTwoDroneToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      input: commands,
    };

    var requestURL = "";

    if (twoDroneToggle == true) {
      requestURL = "http://localhost:4001/twoDroneInput";
    } else {
      requestURL = "http://localhost:4001/singleDroneInput";
    }

    axios.post(requestURL, requestBody).then((res) => {
      if (res.status === 200) {
        alert("Success!, there were " + res.data.photos + " photos taken");
      }
    });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-flexible"
              label="Insert Drone Input Here"
              multiline
              required
              fullWidth
              rows={20}
              value={commands}
              onChange={(e) => setCommands(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <FormLabel>Single Drone</FormLabel>
          </Grid>
          <Grid item>
            <Switch
              onChange={(e) => setTwoDroneToggle(!twoDroneToggle)}
              value={twoDroneToggle}
              name="checkedB"
              color="primary"
            />
          </Grid>
          <Grid item>
            <FormLabel>Two Drones</FormLabel>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
