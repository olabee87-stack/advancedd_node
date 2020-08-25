"use strict";

const http = require("http");
const url = require("url");

const port = process.env.PORT || 3005;
const host = process.env.HOST || "localhost";

const { get, getAll } = require("./persons.js");

// console.log(get("firstname", "Matt"));
// console.log(get("lastname", "River"));
// console.log(get());
// console.log(getAll());

const server = http.createServer((req, res) => {
  const urlData = url.parse(req.url, true);
  const name = urlData.query.name;
  const age = +urlData.query.age;
  const route = urlData.pathname.toLowerCase();

  let result = [];
  if (route === "/persons") {
    result = getAll();
  } else if (route === "/persons/firstname") {
    result = get("firstname", name);
  } else if (route === "/persons/lastname") {
    result = get("lastname", name);
  } else if (route === "/persons/age") {
    result = get("age", age);
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(createWebPage(result)); //send data as a webpage
});

server.listen(port, host, () => {
  console.log(`Server ${host} listening on port${port}`);
});

//Helper
const createWebPage = (searchResult) => {
  let message = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>Persons</title>
    
    </head>

    <body>
    <h1>Search results</h1>`;

  if (searchResult.length === 0) {
    message += "<p>No persons found </p>";
  } else {
    message += `
        <table>
         <thead>
           <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>`;
    for (let person of searchResult) {
      message += `<tr>
<td>${person.firstname}</td>
<td>${person.lastname}</td>
<td>${person.age}</td>
</tr>`;
    }
    message += `</tbody>
</table>
</body>
    
    </html>
`;
  }
  return message;
};
