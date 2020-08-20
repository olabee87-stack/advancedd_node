"use strict";

const http = require("http");

const port = process.env.PORT || 3005;
const host = process.env.HOST || "localhost";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
<!DOCTYPE html>
  <html>
    <head>
    <meta charset="utf-8">
     <title>Request Object</title>
    
    </head>
    <body>
    <h1>Request Info</h1>
    <h2>Headers: ${JSON.stringify(req.headers)}</h2>
    <h2>Host: ${req.headers.host}</h2>
    <h2>Agent: ${req.headers["user-agent"]}</h2>
    <h2>Method: ${req.method}</h2>
    <h2>Url: ${req.url}</h2>
    <h2>Pathname: ${require("url").parse(req.url).pathname}</h2>

    
    </body>
  
  
  </html>

  `);
  res.end();
});

server.listen(port, host, () => {
  console.log(`Server ${host} listening port ${port}`);
});
