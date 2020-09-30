// used by insert.html

"use strict";

(function () {
  let employeeIdField;
  let firstnameField;
  let lastnameField;
  let departmentField;
  let salaryField;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    employeeIdField = document.getElementById("employeeId");
    firstnameField = document.getElementById("firstname");
    lastnameField = document.getElementById("lastname");
    departmentField = document.getElementById("department");
    salaryField = document.getElementById("salary");

    document.getElementById("submit").addEventListener("click", submit);
  }

  //submit to server and get data back
  async function submit() {
    clearMessage(); //clear message area first
    const employee = {
      employeeId: +employeeIdField.value,
      firstname: firstnameField.value,
      lastname: lastnameField.value,
      department: departmentField.value,
      salary: +salaryField.value,
    };
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/insert", options);
      const result = await data.json();

      if (result.message) {
        updateMessage(result.message);
      }
    } catch (err) {
      updateMessage(err.message);
    }
  }
})();
