const fs = require("fs");
const http = require("http");
const allUsers = [
  {
    
    name: "sai",
    email: "sai@gmail.com",
  },
  {
 
    name: "aai",
    email: "aai@gmail.com",
  },
];
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/allUsers") {
    const method = req.method;
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(allUsers));
      return res.end();
    } else if (method == "POST") {
      let newData = "";
      req.on("data", (chunk) => {
        newData += chunk;
      });
    } else if (method === "PUT") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
    } else if (method === "Delete") {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
      req.on("end", () => {
        const newData = JSON.parse(data);
        const hasEmail = newData.email;
        console.log(hasEmail);

        allUsers.push(JSON.parse(newData));
        res.writeHead(200, { "Content-Type": "application/json" });
         res.write(JSON.stringify(allUsers));
        return res.end();
      });
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 | Page Not Found");
    return res.end();
  }
});

server.listen(3000, () => {
  console.log("Server started: Listening on port 3000");
});
