"use strict";
/*eslint-disable no-undef*/

// @ use file in getUrl.html
(function () {
  let searchCriterion;
  document.addEventListener("DOMContentLoaded", init);
  async function init() {
    searchCriterion = document.getElementById("searchCriterion");
    document.getElementById("sendurl").addEventListener("click", update);
  }
  async function update() {
    try {
      const result = await fetch("/urlencoded", {
        method: "POST",
        body: `licence=${searchCriterion.value}`, //url param
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      updatePage(await result.json()); //send back in json format
    } catch (err) {
      showError(err);
    }
  }
})();
