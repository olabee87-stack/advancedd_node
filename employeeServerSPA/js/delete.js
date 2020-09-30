"use strict";

(function () {
  let input;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    input = document.getElementById("employeeId");
    document.getElementById("submit").addEventListener("click", submit);
  }

  async function submit() {
    clearMessage();
    const id = input.value;
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ employeeId: id }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await fetch("/delete", options);
      const result = await data.json();
      if (result.message) {
        updateMessage(result.message);
      }
    } catch (err) {
      updateMessage(err.message);
    }
  }
})();
