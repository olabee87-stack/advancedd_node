"use strict";

const { get } = require("./carStorage");

console.log(get("model", "Hoppa"));
console.log(get("licence", "ABC-1"));

for (let car of get("model", "kaara")) {
  console.log("model:" + car.model + ":" + car.licence);
}
