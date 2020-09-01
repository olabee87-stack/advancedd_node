"use strict";
/*eslint-disable no-undef*/
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
        body: `licence=${searchCriterion.value}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      updatePage(await result.json());
    } catch (err) {
      showError(err);
    }
  }
})();
