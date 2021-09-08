var _ = require("lodash/core");

module.exports = class Drone {
  constructor() {
    this.snapshotStorage = {};
    this.x = 0;
    this.y = 0;
  }

  setSnapshotStorage(snapshotStorage) {
    this.snapshotStorage = snapshotStorage;
  }

  getSnapshotStorage() {
    return this.snapshotStorage;
  }

  moveNorth() {
    ++this.y;
  }

  moveSouth() {
    --this.y;
  }

  moveEast() {
    ++this.x;
  }

  moveWest() {
    --this.x;
  }

  takePhoto() {
    var currentPosition = [this.x, this.y];
    if (currentPosition in this.snapshotStorage) {
      return;
    } else {
      this.snapshotStorage[currentPosition] = true;
    }
  }

  getNumberOfPhotos() {
    return _.size(this.snapshotStorage);
  }

  commandHandler(command) {
    switch (command) {
      case "^":
        this.moveNorth();
        break;
      case "v":
        this.moveSouth();
        break;
      case ">":
        this.moveEast();
        break;
      case "<":
        this.moveWest();
        break;
      case "x":
        this.takePhoto();
        break;
      default:
        /*
                assuming that input has already been sanitized.
                else maybe throw a custom exception.
                */
        break;
    }
  }
};
