import mongoose from "mongoose";

const expertSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: [
      true,
      "Title is required"
    ],
    trim: true,
    minLength: [3, "Title must be atleast 3 chracters long"],
    maxLength: [100, "Title cannot exceed 100 characters"]
  },

  experience: {
    type: Number,
    required: [
      true,
      "Expert's experience is required"
    ],
    min: [0, "Experience cannot be negative"],
    max: [50, "Experience cannot exceed 50 years"]
  },

  industry: {
    type: String, 
    trim: true,
    required: [true, "Industry is required"],
    enum: {
      values: [
        "Agriculture and Natural Resources",
        "Architecture and Construction",
        "Arts, Entertainment, and Media",
        "Business, Management, and Administration",
        "Education and Training",
        "Energy and Utilities",
        "Finance and Banking",
        "Government and Public Administration",
        "Healthcare and Life Sciences",
        "Hospitality and Tourism",
        "Information Technology (IT)",
        "Law and Public Safety",
        "Manufacturing and Production",
        "Marketing and Sales",
        "Science, Technology, Engineering, and Mathematics (STEM)",
        "Transportation, Distribution, and Logistics"
      ],
      message: "Invalid industry value. Please choose from the predefined list."

    },
    required: {
      true: true,
      "Expert's industry is required": true
    }
  }
})

const Experts = mongoose.model("Experts", expertSchema);
export default Experts