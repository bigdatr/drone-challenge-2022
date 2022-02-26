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
}

module.exports = DroneInstruction;
