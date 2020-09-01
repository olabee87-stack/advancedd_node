"use strict";
/*eslint-disable no-undef*/
(function () {
  let searchCriterion;
  document.addEventListener("DOMContentLoaded", init);
  async function init() {
    searchCriterion = document.getElementById("searchCriterion");
    document.getElementById("sendjson").addEventListener("click", update);
  }
  async function update() {
    try {
      const result = await fetch("/jsonencoded", {
        method: "POST",
        body: JSON.stringify({ licence: searchCriterion.value }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      updatePage(await result.json());
    } catch (err) {
      showError(err.message);
    }
  }
})();
