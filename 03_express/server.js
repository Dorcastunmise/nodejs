//const express = require("express"); package.json will have "type": "commonjs",
//or
import conn from "./conn/connectdb.js";
import dotenv from "dotenv";
import express from "express"; //  "type": "module",
//import {companies} from "./data/data.js";
import {customrouter, logger, blocker, setheader} from "./middlewares/custom.js";
import notFound from "./middlewares/notFound.js";
import boardDirectoriesRouter from "./routes/board_directories.js";
import compRolesRouter from "./routes/company_directories.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.use(logger);
app.use(blocker);
app.use(setheader);

app.use(customrouter);
app.use("/company",compRolesRouter);
app.use("/board",boardDirectoriesRouter); //  in postman, use http://localhost:3000/board/board-register to register a new board member
app.use(notFound);

//
app.listen(PORT, async () => {
  try {

    console.log("Database connection pending...");
    await conn(process.env.MONGODB_URI);
    console.log("Database connection established successfully!!");

  } catch(err) {console.log("Database connection failed!!", err);}
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