const express = require("express");
const cors = require("cors");
const Drone = require("./drone");

const app = express();

app.use(cors());
// Probably a better way to do this but added limit to handle PayloadTooLargeError
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.json({ foo: "bar" });
});

app.post("/singleDroneInput", (req, res) => {
  const input = req.body.input;
  const output = droneReader(input);
  res.json({ photos: output });
});

app.post("/twoDroneInput", (req, res) => {
  const input = req.body.input;
  const output = twoDroneReader(input);
  res.json({ photos: output });
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

function droneReader(droneInput) {
  commandArray = [...droneInput];
  const drone = new Drone();

  streamCommands(drone, commandArray);

  return drone.getNumberOfPhotos();
}

function twoDroneReader(dronesInput) {
  commandArray = [...dronesInput];

  droneOneCommandArray = [];
  droneTwoCommandArray = [];
  partitionedCommandArray = [droneOneCommandArray, droneTwoCommandArray];

  commandArray.forEach((command, index) =>
    partitionedCommandArray[index % 2].push(command)
  );

  const droneOne = new Drone();
  streamCommands(droneOne, droneOneCommandArray);

  const droneTwo = new Drone();
  droneTwo.setSnapshotStorage(droneOne.getSnapshotStorage());
  streamCommands(droneTwo, droneTwoCommandArray);

  return droneTwo.getNumberOfPhotos();
}

function streamCommands(drone, commandArray) {
  for (let index = 0; index < commandArray.length; index++) {
    const command = commandArray[index];
    drone.commandHandler(command);
  }
}
