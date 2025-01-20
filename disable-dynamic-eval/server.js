const vm = require('node:vm');
const http = require("node:http");
const url = require("node:url");

const hostname = "127.0.0.1";
const port = 3000;


const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  let result =
    'Please provide a valid math expression in the "expr" query parameter.';

  if (queryObject.expr) {
    try {
      result = eval(queryObject.expr);
    } catch (e) {
      console.error(e);
      result = "Error evaluating expression.";
    }
  }

  // This however, still works!
  const code = 'console.log("Hello, World!")';
  vm.runInThisContext(code);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`Result: ${result}\n`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
