"use strict";

//@use in getSelection.html for the cars
(function () {
  let carSelection;
  let resultarea;
  document.addEventListener("DOMContentLoaded", init);
  async function init() {
    carSelection = document.getElementById("carselection");
    resultarea = document.getElementById("resultarea");
    try {
      let result = await fetch("/getAll"); //{ method: "GET" });
      initSelection(await result.json());
    } catch (err) {
      showError("Data transfer interrupted");
    }
  }

  function initSelection(queryResult) {
    if (!queryResult || queryResult.error) {
      showError(queryResult.error);
    } else {
      for (let car of queryResult) {
        let option = document.createElement("option");
        option.value = car.licence;
        option.textContent = car.licence;
        carSelection.appendChild(option);
      }
      carSelection.addEventListener("change", choose);
      carSelection.value = "";
    }
  }

  async function choose() {
    let licence = carSelection.value;
    carSelection.selectedIndex = 0;

    if (licence.length > 0) {
      const result = await fetch("/jsonencoded", {
        method: "POST",
        body: JSON.stringify({ licence }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      updatePage(await result.json());
    } else {
      resultarea.innerHTML = "";
    }
  }
})();
