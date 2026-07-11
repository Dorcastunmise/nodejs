import mongoose from "mongoose";


const conn = async(uri) => {
  
    await mongoose.connect(uri)
    .then(() => {
      console.log("Connected to MongoDB successful!");
    })
  
}

export default conn;