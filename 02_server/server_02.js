const http = require("node:http");
const url = require("node:url");
let path = url;

const server = http.createServer((req, res) => {
  path = req.url;
  console.log(path);

  if(path == "/") res.end("Home section accessed!");
  else if(path == "/career") res.end("Careers in demand");
  else {
    res.writeHead(404);
    res.end("Page not found")
  };
});

const port = 3000;
server.listen(
  port,
  "127.0.0.1", 
  () => {console.log(`server listening at port ${port}`)}
);  //listening at port 3000, using the default IP address localhost of 127.0.0.1: 127.0.0.1:3000