const DroneInstruction = require("../helpers/DroneInstruction");

const processInstructions = (droneInstructions, dronesCount) => {
  if (dronesCount === 2) {
    const dividedInstructions = DroneInstruction.divideInstructions(
      droneInstructions
    );
    const firstDrone = new DroneInstruction();
    firstDrone.executeInstructions(dividedInstructions[0]);
    const firstDroneCoordinates = firstDrone.getCoordinates();

    const secondDrone = new DroneInstruction();
    secondDrone.setCoordinates(firstDroneCoordinates);
    secondDrone.executeInstructions(dividedInstructions[1]);
    const secondDroneCoordinates = secondDrone.getCoordinates();
    const secondDronePhotos = Object.keys(secondDroneCoordinates).length;
    return {
      photos: secondDronePhotos,
      drones: dronesCount,
      isTwo: true,
    };
  }

  const drone = new DroneInstruction();
  drone.executeInstructions(droneInstructions);
  const droneCoordinates = drone.getCoordinates();
  const dronePhotos = Object.keys(droneCoordinates).length;
  return {
    photos: dronePhotos,
    drones: dronesCount,
  };
};

module.exports = {
  processInstructions,
};
