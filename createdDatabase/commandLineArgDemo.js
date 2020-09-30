const [, , ...tail] = process.argv;
console.log(tail);

const [nodePath, programPath, ...rest] = process.argv;
console.log("node path:", nodePath);
console.log("progra path:", programPath);
console.log("arguments", rest);

if (process.argv.length > 2) {
  console.log(process.argv[2]);
}

// console.log(createStatementFile);

// printMessage("hello");
// printStatement("sqlstatement");
// printError("This is a great error");

// try {
//   await db.doQuery(dropDatabaseSql);
//   if (DEBUG) printStatement(dropDatabaseSql);
//   await db.doQuery(createtDatabaseSql);
//   if (DEBUG) printStatement(createtDatabaseSql);
//   if (createStatements.dropUserSql) {
//     await db.doQuery(dropUserSql);
//     if (DEBUG) printStatement(dropUserSql);
//   }
//   await db.doQuery(createUserSql);
//   if (DEBUG) printStatement(createUserSql);
//   await db.doQuery(grantPrivilegesSql);
//   if (DEBUG) printStatement(grantPrivilegesSql);
// } catch (err) {
//   printError(err.message);
// }
