"use strict";

const {
  getTypes,
  getNumbersByType,
  getAllNumbersByType,
  getAllNumbers,
} = require("./telephones");

//Solution one log
console.log(getTypes());

//Solution two log
console.log(getNumbersByType("Matt", "River", "home"));

//Solution three log
console.log(getAllNumbersByType("home"));

//Solution 4
console.log(JSON.stringify(getAllNumbers()));
