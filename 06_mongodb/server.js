import express from "express";  
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

//connection
mongoose.connect("mongodb://127.0.0.1:27017/localDBCrud")
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
  email:String,
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
  const user = await User.createCollection;
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});