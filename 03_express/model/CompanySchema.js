import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
    trim: true
  },
  industry: {
    type: String,
    required: [true, "Industry is required"],
    trim: true
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true
  },
  founded: {
    type: Number,
    required: [true, "Founded year is required"],
    min: [1800, "Founded year cannot be before 1800"],
    max: [new Date().getFullYear(), "Founded year cannot be in the future"]
  },
  employees: {
    type: Number,
    required: [true, "Employee count is required"],
    min: [0, "Employee count cannot be negative"]
  }
});

const Companies = mongoose.model("Companies", companySchema);
export default Companies;
