import express from "express";
import {readFileSync} from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {v4 as uuid} from "uuid";


const PORT = 5500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

const commentId = uuid();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Comments
try {
  const filePath = path.join(__dirname, 'public', 'js', 'comments.js');
  let rawData = readFileSync(filePath, 'utf8');

  // Remove trailing commas and semicolons to make it valid JSON
  rawData = rawData
      .replace(/,\s*]/g, ']') // remove trailing comma before ]
      .replace(/,\s*}/g, '}') // remove trailing comma before }
      .replace(/;$/, '');     // remove ending semicolon

  // Convert JS object syntax to JSON (wrap keys in quotes if needed)
  // If keys are already quoted, skip this step
  const jsonCompatible = rawData.replace(/(\w+)\s*:/g, '"$1":');

  const commentData = JSON.parse(jsonCompatible);
  //console.log(commentData);

  //All comments retrieval
  app.get("/comments", (req, res) => {
  res.render("comments/index", {commentData});
  });
  
  //Comment newly created retrieval
  app.get("/comments/new", (req, res) => {
    res.render("comments/new");
  });
   
  //Comment creation
  app.post("/comments/new", (req, res)=> {
    const {username, comments} = req.body;
    const newComment = { id: commentId, username, comments };
    commentData.push(newComment);
    res.redirect("/comments");
  });

  //retrieval of data based on ID
  app.get("/comments/:id", (req, res) => {
    const {id} = req.params;
    const each_comment = commentData.find((rec) => {
      return rec.id == id; 
    });

    res.render("comments/show", {each_comment});
  });

  //Partial modification unlike PUT(replaces all current representation of target resource)
  app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const retrievedComment = req.body.comments;
    const foundComment = commentData.find((rec) => {
      return rec.id == id;
    });

    foundComment.comments = retrievedComment;
    res.redirect("/comments");
  });

} catch (err) {
    console.error('Error reading or parsing file:', err.message);
}




app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});