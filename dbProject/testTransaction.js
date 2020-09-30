"use strict";
const MySQL = require("./transactionDatabase");
const db = new MySQL({
  host: "localhost",
  port: 3306,
  user: "zeke",
  password: "secret",
  database: "employeedb",
});

// const statements=[
//     {sql:'select * from employee', parameters:[]},
//     {
//     sql:'insert into employee values(?,?,?,?,?)',
//     parameters:[200,'Peter','Bond','admin',4000]
//     },
//     {
//     sql: 'insert into employee values(?,?,?,?,?)',
//     parameters: [136, 'Betty', 'Anderson', 'admin', 4000]
//     },
//     { sql: 'select * from employee', parameters: [] },
//     { sql:'delete from employee where employeeId=?', parameters:[200]},
//     { sql: 'delete from employee where employeeId=?', parameters: [201] },
//     { sql: 'select * from employee', parameters: [] },
//    ];
//    (async ()=>{
//     try{
//     const result=await db.doTransaction(statements);
//     console.log(result);
//     }
//     catch(err){
//     console.log(err.message);
//     }
//    })();

const statements = [
  { sql: "select * from employee", parameters: [] },
  {
    sql: "insert into employee values(?,?,?,?,?)",
    parameters: [200, "Peteru", "Bond", "admin", 4000],
  },
  {
    sql: "insert into employee values(?,?,?,?,?)",
    parameters: [136, "Betty", "Anderson", "admin", 2000],
  },

  { sql: "select * from employee", parameters: [] },
  { sql: "delete from employee where employeeId=?", parameters: [200] },
  { sql: "select * from employee", parameters: [] },
];

(async () => {
  try {
    const result = await db.doTransaction(statements);
    console.log(JSON.stringify(result, null, 4)); //@null 4, fixes indentation in printing
  } catch (error) {
    console.log(error.message);
  }
})();
