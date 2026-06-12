//ejs template engine was installed and command "node --watch server.js" was used to run the server

/*
  EJS (Embedded JavaScript Templating) is a popular templating engine for JavaScript that allows embedding of  JavaScript code within HTML templates. This makes it easier to create dynamic web pages by combining data with templates. Here’s a guide on how to use EJS in your Node.js applications.
 */
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {readFileSync} from 'fs';


const rawData = readFileSync("./data.json");
const redditMimic = JSON.parse(rawData);


const app = express();
const PATH = 3000;

//view engine setup
app.set("view engine", "ejs");

//express static setup
app.use(express.static("public"));

/*
new URL('file:///C:/path/').pathname; // Incorrect: /C:/path/
fileURLToPath('file:///C:/path/');  // Correct: C:\path\(Windows) . fileURLToPath gives resolved path to the file
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//template engine folder
app.set("views", path.join(__dirname + "/views"))
//console.log( path.join(__dirname + "/views"));


//routes
app.get("/", (req, res) => {
  //res.send(`Home Page display`);
  res.render("index", {title: 'home'}); //ejs extension not required since it has been configured in the setup
});

app.get("/random", (req, res) => {
  const randomInt =  Math.floor(Math.random() * 10) + 1;
  res.render("random", {
    parsedInt: randomInt,
    title: "Random"
  })
});

app.get("/r/:subreddit/:era", (req, res) => {
  const {subreddit, era} = req.params;
  res.render("subreddit", {subreddit, era, title: `${subreddit} - ${era}`});
});

app.get("/fruits", (req, res) => {
  const data = ["guava", "avocado", "melon", "papaya"];
  const capitalizedData = data.map((fruit) => fruit.charAt(0).toUpperCase() + fruit.slice(1));
  res.render("fruits", {data: capitalizedData, title: "Fruits"});
});

app.get("/r/:bodyContent", (req, res) => {
  const {bodyContent} = req.params;
  const redditSample = redditMimic[bodyContent];
  if(redditSample) res.render("interfaceContent",{...redditSample, title: redditSample.name});
  else res.render("notFound",{bodyContent, title: "Not Found"});
});

 app.use((req, res) => {
  res.status(404).render("notFound", { 
    bodyContent: req.originalUrl, 
    title: "Page Not Found" 
  });
});

//server listening
app.listen(PATH, () => {
  console.log(`Server is listening at port ${PATH}`);
});

