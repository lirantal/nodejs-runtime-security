const http = require("http");
const url = require("url");

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

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`Result: ${result}\n`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
