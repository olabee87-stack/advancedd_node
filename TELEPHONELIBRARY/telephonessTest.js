"use strict";

const {
  getTypes,
  getNumbersByType,
  getAllNumbersByType,
  getAllNumbers,
  getName,
} = require("./telephoness");

//Solution one log
console.log(getTypes());

//Solution two log
console.log(getNumbersByType("Matt", "River", "home"));

//Solution three log
console.log(getAllNumbersByType("home"));

//Solution 4
console.log(JSON.stringify(getAllNumbers()));

//Solution 5
console.log(getName("123467"));
