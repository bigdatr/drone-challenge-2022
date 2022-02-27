const DroneInstruction = require("../helpers/DroneInstruction");

const processInstructions = (droneInstructions, dronesCount) => {
  if (dronesCount === 2) {
    const dividedInstructions = DroneInstruction.divideInstructions(
      droneInstructions
    );
    const firstDrone = new DroneInstruction();
    firstDrone.executeInstructions(dividedInstructions[0]);
    const firstDroneCoordinates = firstDrone.getCoordinates();
    const firstDronePhotos = Object.keys(firstDroneCoordinates).length;

    const secondDrone = new DroneInstruction();
    secondDrone.setCoordinates(firstDroneCoordinates);
    secondDrone.executeInstructions(dividedInstructions[1]);
    const secondDroneCoordinates = secondDrone.getCoordinates();
    const secondDronePhotos = Object.keys(secondDroneCoordinates).length;
    return {
      drones: {
        0: {
          photos: firstDronePhotos,
        },
        1: {
          photos: secondDronePhotos,
        },
      },
    };
  }

  const drone = new DroneInstruction();
  drone.executeInstructions(droneInstructions);
  const droneCoordinates = drone.getCoordinates();
  const dronePhotos = Object.keys(droneCoordinates).length;
  return {
    drones: {
      0: {
        photos: dronePhotos,
      },
    },
  };
};

module.exports = {
  processInstructions,
};
