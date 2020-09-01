"use strict";

const cars = require("./cars.json");

module.exports = (key, value) => {
  const found = [];
  //   let found = []; - Version 2

  //Check if keys are available an
  if (key && value) {
    const valueUpper = value.toUpperCase();
    for (let car of cars) {
      if (car[key].toUpperCase() === valueUpper) {
        found.push(car);
      }
    }
  } else {
    found.push(...cars);
    // found = cars; - Version 2
  }
  return found;
};
