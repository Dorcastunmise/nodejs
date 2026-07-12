import mongoose from "mongoose";

const conn = async(uri) => {
  try {
    await mongoose.connect(uri)
  } catch(err) {
    console.log("Database connection failed!!", err);
    throw err;
  }
  
}

export default conn