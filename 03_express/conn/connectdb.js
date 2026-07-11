import mongoose from "mongoose";


const conn = async(uri) => {
  try{
    await mongoose.connect(uri)
    .then(() => {
      console.log("Connected to MongoDB successful!");
    })
  }
  catch(err){
    console.log("Error connecting to MongoDB:.. ", err);
  }
}

export default conn;