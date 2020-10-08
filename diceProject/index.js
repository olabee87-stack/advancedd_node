"use strict";

const Dice = require("./dice");

const diceA = new Dice();
const diceB = new Dice();

console.log("diceA:", diceA.toString());
console.log("diceB:", diceB.toString());

diceA.roll();
diceB.roll();

console.log("diceA", diceA.toString());
console.log("diceB", diceB.toString());

if (diceA.dots === diceB.dots) {
  console.log("same dots");
} else if (diceA.dots > diceB.dots) {
  console.log("A wins");
} else {
  console.log("B wins");
}
