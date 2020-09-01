"use strict";
(function () {
  let iceCreamList;
  let resultarea;

  //on load of the dom, run the fetch - line 13
  document.addEventListener("DOMContentLoaded", init);
  async function init() {
    iceCreamList = document.getElementById("iceCreamList"); //as named in home.html
    resultarea = document.getElementById("resultarea"); //as named in home.html

    try {
      // const flavors = await fetch("/all").then((result) => result.json());
      const data = await fetch("/all");
      const flavors = await data.json();
      populateIceCreamList(flavors);
    } catch (err) {
      showErrorMessage(err.message);
    }
  }
  function populateIceCreamList(queryResult) {
    if (!queryResult || queryResult.message) {
      showErrorMessage("Sorry, something went wrong.");
    } else {
      //array from the server
      for (let flavor of queryResult) {
        const option = document.createElement("option");
        option.value = flavor;
        option.textContent = flavor;
        iceCreamList.appendChild(option);
      }
      iceCreamList.addEventListener("change", choose);
      iceCreamList.value = "";
    }
  }

  //Fetching the right data
  async function choose() {
    let iceCream = iceCreamList.value;
    if (iceCream.length > 0) {
      try {
        const data = await fetch(`/icecreams/${iceCream}`).then((result) =>
          result.json()
        );
        updateResult(data);
      } catch (err) {
        showErrorMessage(err.message);
      }
    } else {
      clearResultarea();
    }
  }

  //Clear result area when option is not in view - Line 50
  function clearResultarea() {
    resultarea.innerHTML = "";
  }

  //Update result
  function updateResult(data) {
    if (!data) {
      showErrorMessage("Programming error. Sorry!");
    } else if (data.message) {
      showErrorMessage(data.message);
    } else if (data.name && data.name.length === 0) {
      clearResultarea();
    } else {
      let htmlString = `
   
    <p id="name">${data.name}</p>
    <p id="price">${data.price} €</p>
    `;
      if (data.image && data.image.length > 0) {
        htmlString += `
      
        <img id="image" src="/images/${data.image}" />`;
      }
      resultarea.innerHTML = htmlString;
    }
  }
  //Error message to display
  function showErrorMessage(message) {
    resultarea.innerHTML = `
    <div class="error">
    <h2>Error</h2>
    <p>${message}</p>
    </div>`;
  }
})();
