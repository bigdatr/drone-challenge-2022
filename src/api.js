const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { processInstructions } = require("./services/DroneService");
const { INSTRUCTIONS } = require("./constants/instruction");

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ foo: "bar" });
});

app.post("/instructions", (req, res) => {
  const { instructions, drones } = req.body;

  const droneInstructions = instructions.split("").filter((instruction) => {
    return [
      INSTRUCTIONS["X"],
      INSTRUCTIONS["N"],
      INSTRUCTIONS["S"],
      INSTRUCTIONS["E"],
      INSTRUCTIONS["W"],
    ].includes(instruction);
  });

  const data = processInstructions(droneInstructions, drones);
  res.json({ data: data });
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));
