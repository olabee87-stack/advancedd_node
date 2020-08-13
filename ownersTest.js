"use strict";
const owners = require("./owners.json");
console.log(owners[0].firstname);
console.log(owners[1].firstname);
console.log(owners[2].firstname);

let key = "firstname";

console.log("name", owners[0][key]);

key = "lastname";
console.log("name", owners[0][key]);

//ES6 method
for (let owner of owners) {
  console.log(owner.firstname);
}

//Old method
/*for(let i=0; i<owners.length;i++){
  console.log(owners[i].lastname);
}*/

for (let owner of owners) {
  console.log(`Firstname: ${owner.firstname}, lastname:
${owner.lastname}`);
}
