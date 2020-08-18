"use strict";

const {
  getTypes,
  getNumbersByType,
  getAllNumbersByType,
} = require("./telephones");

//Solution one log
console.log(getTypes());

//Solution two log
console.log(getNumbersByType("Matt", "River", "home"));

//Solution three log
console.log(getAllNumbersByType("home"));
