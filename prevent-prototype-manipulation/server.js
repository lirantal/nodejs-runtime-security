const http = require("http");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;

const userContact = {
  phone: "123-456-7890",
  home: {
    address: "123 Home St",
    city: "Hometown",
    state: "HT",
    zip: "12345",
  },
  business: {
    address: "456 Business Rd",
    city: "Businesstown",
    state: "BT",
    zip: "67890",
  },
};

const userInfo = {
  name: "John Doe",
  email: "john@example.com",
};

const deepMerge = (target, source) => {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
};


const a = {}
const server = http.createServer((req, res) => {
    let result;

  if (req.url === "/admin") {
    if (userInfo.isAdmin) {
      result = "This is the admin page.";
    }
  } else {

    // uncomment to get some clarity on how these programmatic API
    // changes of the prototype chain are handled by the different
    // CLI flags to Node.js:
    // const b = {}
    // b.constructor.prototype.isAdmin = true
    // console.log(b)
    // console.log('b is admin')
    // console.log(b.isAdmin)
    // const c = {}
    // console.log(c)
    // console.log('c is admin')
    // console.log(c.isAdmin)
    // console.log(c.__proto__)
    // console.log({}.__proto__)

    const queryObject = url.parse(req.url, true).query;
     result =
      JSON.stringify({
        error: 'Please provide a valid address type and value in the query parameters.'
      });

    if (queryObject.type && queryObject.value) {
      try {
        const newAddress = {
          [queryObject.type]: { [queryObject.field]: queryObject.value },
        };

        console.log({newAddress});
        const mergedContact = deepMerge(
          JSON.parse(JSON.stringify(userContact)),
          newAddress
        );
        result = JSON.stringify(mergedContact, null, 2);
      } catch (e) {
        console.error(e);
        result = "Error merging address information.";
      }
    }
  }

//   to understand this a bit better, you can uncomment the below
//   console.log('a.isAdmin:', a.isAdmin)
//   console.log('a.address:', a.address)
//   console.log('a.__proto__:', a.__proto__)


  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(result);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
