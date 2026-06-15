import express from "express";  
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json())

//connection
//mongoose.connect("mongodb://127.0.0.1:27017/localDBCrud")
mongoose.connect(MONGODB_URL)
.then(() => {
  console.log("Mongodb connected successfully!!");
})
.catch((error) => {
  console.log("Error = ", error);
});

//schema/boilerplate for the collection to follow
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{type: String, required: true},
  age:Number
});

/*
  model: blueprint on whcih similar data types will be inserted in a collection. 
  "user" - collection
  userSchema - boilerplate
  User - model
*/
const User = mongoose.model("user", userSchema);

app.post("/users", async(req, res) => {
  const user = await User.create(req.body);
  //201 - new data created e.g signup, post created
  res.status(201).json(user);
});

app.get("/users", async(req, res) => {
  const user = await User.find();
  res.json(user);
});

app.get("/users/:id", async(req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.put("/users/:id", async(req, res) => {
  const updUser = await User.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true }
  );
  res.json(updUser);
});

app.delete("/users/:id", async(req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json(`message: user [${deletedUser.name}] deleted successfully!!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});