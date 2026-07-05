const http = require("node:http");
const url = require("node:url");
const { all } = require("proxy-addr");
const { message } = require("statuses");

const server = http.createServer((req, res) => {
  let path = req.url;
  const parsedUrl = url.parse(path, true);
  method_used = req.method;
  req_headers = req.headers;
  req_data = req;
  

  const req_info =  {
    query: parsedUrl.query,
    link: path,
    function: method_used,
    heading: req_headers
  }

  //console.log(JSON.stringify(req_info, null, 2));

  //to bypass checking browser for these, run "curl 127.0.0.1:3000" command
  /*
  if(path === "/") {
    res.writeHead(200);
    res.end("Home section accessed!");
  }
  else if(path === "/career") res.end(JSON.stringify({
    status: 200,
    message: "Careers in demand"
  }));
  else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });
    res.write("Server rejected parsed query!");
    res.end("Page not found");
  };

  */

  let experts = [
    {
      title: "Politics",
      experience: 15
    },
    {
      title: "Football",
      experience: 5
    },
    {
      title: "Entrepreneur",
      experience: 8
    },
    {
      title: "Circus",
      experience: 12
    }
  ];
  
  if(method_used == 'GET') {
    if(path == '/career') {
      res.writeHead(200);
      res.write("Careers in demand are...");      
      return res.end(JSON.stringify(
        {
          successful: true,
          data: experts         
        }
      ));
    }
    
    if(path == '/top-candidate') {
      let top_experts = experts.filter((candidate) => candidate.experience > 10);

      res.writeHead(202);
      res.write("open roles...");
      return res.end(JSON.stringify(
        {
          successful: true,
          data: top_experts
        }
      ));
    }
  }

  if(method_used == "POST") {
    /*
      run  command or pass them in postman
      curl.exe -X POST http://127.0.0.1:3000/create-role `
      >>   -H "Content-Type: application/json" `
      >>   -d "{\`"title\`": \`"Lawyer\`", \`"experience\`": 13}"
    */
    if(path == "/create-role") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      return req.on("end", () => {
        try {
          const corporateData = JSON.parse(body);
          if(!corporateData.title) {
            res.writeHead(400);
            return res.end(JSON.stringify(
              {
                successful: false,
                message: "Kindly provide role title"
              }
            ));
          }

          experts.push(corporateData);
          res.writeHead(201);
          return res.end(JSON.stringify(
            {
              successful: true,
              message: "Role created successfully",
              all_roles: experts
            }
          ));
        } catch (error) {
          res.writeHead(400);
          return res.end(JSON.stringify({
            successful: false,
            message: "Malformed JSON payload"
          }));
        }
      });    
    }
  }

  res.writeHead(404);
  res.end(JSON.stringify({ successful: false, message: "Route not found" }));
});

const port = 3000;
server.listen(
  port,
  "127.0.0.1", 
  () => {console.log(`server listening at port ${port}`)}
);