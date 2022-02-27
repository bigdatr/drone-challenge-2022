const { INSTRUCTIONS } = require("../constants/instruction");
class DroneInstruction {
  coordinates = {};
  xAxis = 0;
  yAxis = 0;

  capturePhoto() {
    const currentAxis = [this.xAxis, this.yAxis];
    if (!(currentAxis in this.coordinates)) {
      this.coordinates[currentAxis] = true;
    }
    return;
  }

  moveUp() {
    this.yAxis++;
  }

  moveDown() {
    this.yAxis--;
  }

  moveRight() {
    this.xAxis++;
  }

  moveLeft() {
    this.xAxis--;
  }

  getCoordinates() {
    return this.coordinates;
  }

  setCoordinates(coordinates) {
    this.coordinates = {
      ...this.coordinates,
      ...coordinates,
    };
  }

  static divideInstructions(instructions) {
    const fistDroneInstructions = [];
    const secondDroneInstructions = [];

    instructions.forEach((instruction, index) => {
      if (index % 2 === 0) {
        fistDroneInstructions.push(instruction);
        return;
      }

      secondDroneInstructions.push(instruction);
      return;
    });

    return [fistDroneInstructions, secondDroneInstructions];
  }

  executeInstructions(instructions) {
    instructions.forEach((instruction) => {
      switch (instruction) {
        case INSTRUCTIONS["N"]:
          this.moveUp();
          break;
        case INSTRUCTIONS["S"]:
          this.moveDown();
          break;
        case INSTRUCTIONS["E"]:
          this.moveRight();
          break;
        case INSTRUCTIONS["W"]:
          this.moveLeft();
          break;
        case INSTRUCTIONS["X"]:
          this.capturePhoto();
          break;
        default:
          return;
      }
    });
  }
}

module.exports = DroneInstruction;
