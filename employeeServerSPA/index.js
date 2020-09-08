const Datastorage = require("./dataStorage/dataStorageLayer");

const dataStorage = new Datastorage();

dataStorage.getAll().then((result) => console.log(result));

dataStorage.get(1).then((result) => console.log(result));
