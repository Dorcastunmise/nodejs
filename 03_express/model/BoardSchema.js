import mongoose from "mongoose";

const BoardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Board name is required"],
      trim: true,
      minLength: [3, "Board name must be at least 3 characters long"],
      maxLength: [100, "Board name cannot exceed 100 characters"]
    },
    email: {
      unique: [true, "Email must be unique"],
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
      maxLength: [100, "Password cannot exceed 8 characters"]
    },

  },
  {
    timestamps: true
  }
)

const Board = mongoose.model("Board", BoardSchema)
export default Board