//const express = require("express"); package.json will have "type": "commonjs",
//or

import express from "express"; //  "type": "module",
const app = express();
const PORT = 3000;

app.get("/", (req, res)=> {
  res.send("Hello and welcome to your first Express Server!");
});

app.get("/dashboard", (req, res) => {
  /*
  res.send("Live Score Sheet");
  res.send("<p>Live Score Sheet</p>");
  res.sendFile("<p>Live Score Sheet</p>");
  res.json({
    name: "Timan",
    duration: 7
  });
  res.cookie('name', 'tobi', {path: '/admin'});
  res.clearcookie('name', {path: '/admin'});
  res.status(200).send("Live Score Sheet");
  */
  res.send(Buffer.from("Live Score Sheet"));
});

app.get("/contact", (req, res) => {
 res.cookie('role', 'security', {path: '/admin'});
});

//dynamic routing
app.get("/news/:topics/:sortby", (req, res) => {
  //let dynamic_url = req.params.topics;
  //or 
  const {topics, sortby} = req.params;
  //const {sortby} = req.params;
  const data = `fetching ${topics} and sorted by ${sortby}`;
  console.log(data);
  res.send(data);
})

//query string
app.get("/search", (req, res) => {
  console.log(req.query);
  const {report, section, page} = req.query;

  res.send(`seaching for ... ${report} ... and ${section}...on page: ${page}`);
});


app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});