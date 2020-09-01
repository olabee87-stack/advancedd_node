"use strict";
/*eslint-disable no-unused-vars*/
let resultarea;
document.addEventListener("DOMContentLoaded", init);
function init() {
  resultarea = document.getElementById("resultarea");
}
function updatePage(cars) {
  resultarea.innerHTML = "";
  const ul = document.createElement("ul");
  for (let car of cars) {
    let li = document.createElement("li");
    li.textContent = `${car.model}: ${car.licence}`;
    ul.appendChild(li);
  }
  resultarea.appendChild(ul);
}
function clearResult() {
  resultarea.innerHTML = "";
}
function showError(message) {
  resultarea.innerHTML = `
 <h1 class="error">Error</h1>
 <div class="error">
 <img src="/images/err.png" alt="error">
 <p class = "error"> ${message} </p>
 </div>`;
}
