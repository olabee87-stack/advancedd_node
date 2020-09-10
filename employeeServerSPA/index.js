const Datastorage = require("./dataStorage/dataStorageLayer");

const dataStorage = new Datastorage();

// dataStorage.getAll().then((result) => console.log(result));

// dataStorage.get(1).then((result) => console.log(result));

// dataStorage.get(100).then((result) => console.log(result));

const newEmployee = {
  employeeId: 4,
  firstname: "  Mary",
  lastname: "Stormy",
  department: "food",
  salary: 9000,
};
dataStorage.insert(newEmployee).then((result) => console.log(result));
