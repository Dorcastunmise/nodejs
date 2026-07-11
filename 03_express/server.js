//const express = require("express"); package.json will have "type": "commonjs",
//or
import conn from "./conn/connectdb.js";
import dotenv from "dotenv";
import express from "express"; //  "type": "module",
import {experts, companies} from "./data/data.js";
import {customrouter, logger, blocker, setheader} from "./middlewares/custom.js";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.use(logger);
app.use(blocker);
app.use(setheader);
app.use(customrouter);

//
app.listen(PORT, '127.0.0.1', () => {
  try {
    conn(process.env.MONGODB_URI);
    console.log("Connection successful!!");
  } catch(err){
    console.log("Connection failed due to: ", err);
  }
  console.log(`Server is listening at port ${PORT}`);
});



/*
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


app.get("/get-careers", getCareerRoles);
app.get("/careers", getCareers);
app.get("/careers/:id", getEachExpertRec);
app.get("/companies/:companyid/careers/:expertid", getCompanyExpert);
app.get("/career_status", getCareerSta);
app.get("/", home);
app.get("/dashboard", dashboard);
app.get("/contact", getContact);
app.post("/careers", updateCareers);
app.patch("/update-career/:id",updateCareer);
app.delete("/delete-role", deleteCareer);

*/