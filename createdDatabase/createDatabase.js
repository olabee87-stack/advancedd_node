//createDatabase.js
"use strict";
const Database = require("./database");

const printMessage = (message) => console.log(message);
const printStatement = (statement) => printMessage(`${statement};`);
const printError = (message) =>
  printMessage(
    `${"#".repeat(20)} Error ${"#".repeat(20)}\n${message}\n${"#".repeat(47)}`
  );

let createStatementFile = "./createStatements .json"; //give to commandline as param

if (process.argv.length > 2) {
  createStatementFile = `./${process.argv[2]}`;
}

try {
  createDB(require(createStatementFile));
} catch (err) {
  printError(err.message);
}

//@createDB function
async function createDB(createStatements) {
  //printStatement(createStatements);
  const options = {
    host: createStatements.host,
    port: createStatements.port,
    user: createStatements.admin,
    password: createStatements.adminpassword,
  };

  const DEBUG = createStatements.debug;
  const db = new Database(options); //@create new db from db.js file

  // 'zeke'@'localhost'
  const user = `'${createStatements.user}'@'${createStatements.host}'`;
  const dropDatabaseSql = `drop database if exists ${createStatements.database}`;
  const createDatabaseSql = `create database ${createStatements.database}`;
  const dropUserSql = `drop user if exists ${user}`; //user from line 37
  const createUserSql =
    `create user if not exists ${user} ` +
    `identified by '${createStatements.userpassword}'`;
  const grantPrivilegesSql = `grant all privileges on ${createStatements.database}.* to ${user}`;

  try {
    await db.doQuery(dropDatabaseSql);
    if (DEBUG) printStatement(dropDatabaseSql);
    await db.doQuery(createDatabaseSql);
    if (DEBUG) printStatement(createDatabaseSql);
    if (createStatements.dropUser) {
      await db.doQuery(dropUserSql);
      if (DEBUG) printStatement(dropUserSql);
    }
    await db.doQuery(createUserSql);
    if (DEBUG) printStatement(createUserSql);
    await db.doQuery(grantPrivilegesSql);
    if (DEBUG) printStatement(grantPrivilegesSql);
    for (let table of createStatements.tables) {
      if (table.columns.length > 0) {
        const createTableSql =
          `create table ${createStatements.database}.${table.tableName} (` +
          `\n\t${table.columns.join(",\n\t")}` +
          `)`;
        await db.doQuery(createTableSql);
        if (DEBUG) printStatement(createTableSql);
        if (table.data.length > 0) {
          const rows = [];
          for (let data of table.data) {
            const insertRowSql =
              `insert into ${createStatements.database}.${table.tableName} ` +
              `values(${Array(data.length).fill("?").join(",")})`;
            rows.push(db.doQuery(insertRowSql, data));
          }
          await Promise.all(rows);
          if (DEBUG) printMessage("data added.");
        } else {
          if (DEBUG) printMessage("data missing.");
        }
      } else {
        if (DEBUG)
          printMessage("Table columns missing. " + "Table was not created.");
      }
    }

    for (let table of createStatements.tables) {
      //@ && check if the column exists in table and its not empty
      if (table.columns && table.columns.length > 0) {
        const createTableSql =
          `create table ${createStatements.database}.${table.tableName} (` +
          `\n\t${table.columns.join(",\n\t")}` +
          `)`;

        await db.doQuery(createTableSql);
        if (DEBUG) printStatement(createTableSql);

        if (table.data && table.data.length > 0) {
          const rows = [];
          for (let data of table.data) {
            const insertRowSql =
              `insert into ${createStatements.database}.${table.tableName} ` +
              `values(${Array(data.length).fill("?").join(",")})`;

            rows.push(db.doQuery(insertRowSql, data)); //the array in the data
          }

          await Promise.all(rows); //waits tll all promise in the rows are fulfilled
          if (DEBUG) printMessage("Data successfully added");
        } else {
          if (DEBUG) printMessage("Data is missing...");
        }
      } else {
        if (DEBUG) printMessage("No table columns. Table was not created.");
      }
    }
  } catch (err) {
    printError(err.message); //\n
  }
}

// async function createDB(createStatements) {
//  //printStatement(createStatements);
//  const options = {
//  host: createStatements.host,
//  port: createStatements.port,
//  user: createStatements.admin,
//  password: createStatements.adminpassword
//  };
//  const DEBUG = createStatements.debug;
//  const db = new Database(options);
//  // 'zeke'@'localhost'
//  const user = `'${createStatements.user}'@'${createStatements.host}'`;
//  const dropDatabaseSql =
//  `drop database if exists ${createStatements.database}`;
//  const createDatabaseSql = `create database ${createStatements.database}`;
//  const dropUserSql = `drop user if exists ${user}`;
//  const createUserSql = `create user if not exists ${user} ` +
//  `identified by '${createStatements.userpassword}'`;
//  const grantPrivilegesSql =
//  `grant all privileges on ${createStatements.database}.* to ${user}`;
