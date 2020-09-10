"use strict";

//@for thr getAll.html

(function () {
  document.addEventListener("DOMContentLoaded", init); //run init func

  async function init() {
    try {
      const data = await fetch("/all");
      const employees = await data.json();
      const resultset = document.getElementById("resultset");
      for (let employee of employees) {
        const tr = document.createElement("tr");
        tr.appendChild(buildTdElement(employee.employeeId));
        tr.appendChild(buildTdElement(employee.firstname));
        tr.appendChild(buildTdElement(employee.lastname));
        tr.appendChild(buildTdElement(employee.department));
        tr.appendChild(buildTdElement(employee.salary));
        resultset.appendChild(tr);
      }
    } catch (error) {
      console.log("Uh-oh:", err.message);
    }
  }

  //@function for table data
  function buildTdElement(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();
