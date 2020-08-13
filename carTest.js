"use strict";
const cars = require("./cars.json");

const getWithLicence = (licence) => {
  for (let car of cars) {
    if (car.licence.toLocaleUpperCase() === licence.toLocaleUpperCase()) {
      return car;
    }
  }
  return null;
};

let foundCar = getWithLicence("ABC-1");
console.log(foundCar);
console.log(getWithLicence("x"));

const getWithModel = (model) => {
  let carsFound = [];
  for (let car of cars) {
    if (car.model.toUpperCase() === model.toUpperCase()) {
      carsFound.push(car);
    }
  }
  return carsFound;
};

console.log(getWithModel("hoppa"));
console.log("########### kaarat ##########");
console.log(getWithModel("kaara"));
console.log("########### x ##########");
console.log(getWithModel("x"));
