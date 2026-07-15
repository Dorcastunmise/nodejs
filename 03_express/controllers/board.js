import Board from '../model/BoardSchema.js';
import {StatusCodes} from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const boardRegister = async (req, res) => {
  try {
    const data = req.body;
    if(!data.name || !data.email || !data.password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Name, email, and password are required" });
    }

    const hashed_password = await bcrypt.hash(
      data.password, 
      Number(process.env.SALT_ROUNDS)
    );

    const new_board_member = await Board.create({
      ...data, 
      password: hashed_password
    });
    if(!new_board_member) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed to create board" });
    }

    return res
    .status(StatusCodes.CREATED)
    .json({
      success: true,
      message: "Board member created successfully",
      data: new_board_member
    });

    /*
      another way:
      const board = new Board({
        name,
        email,
        password
      })
      await board.save()
      res.status(StatusCodes.CREATED).json(board)
    */
  } catch(error) {
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: error.message })
  }
}

const login = async (req, res) => {
  const data = req.body;
  const {email, password} = data;
  if(!email || !password) {
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Email and password are required" });
  }

  try {
    const board_mem = await Board.findOne({email});
    if(!board_mem) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Board member not found" });
    }

    const checkPass = await bcrypt.compare(password, board_mem.password);
    if(!checkPass) {
      return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid password" });
    }

    const tokenPayload = { 
      id: board_mem._id, 
      email: board_mem.email 
    };
    const token = jwt.sign(
      tokenPayload, 
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_EXPIRES_IN}
    )
    return res
    .status(StatusCodes.OK)
    .json({
      success: true,
      message: "Login successful!",
      token: token,
      data: board_mem
    });
  }
  catch(error) {
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: error.message })
  }

}

const updateProfile = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const data = req.body;
    const id = req.user.id;

    if(!data || Object.keys(data).length === 0) {
      return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Board member's data is required" });
    }

    const logged_user = await Board.findByIdAndUpdate(id, data, {new: true});

    if(!logged_user) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({
        message: "You are not authorized for this operation. Profile update failed!"
      });
    }
    
    return res
      .status(StatusCodes.OK)
      .json({
        success: true,
        message: "Profile update successful!",
        updated_profile: logged_user
      });

  } catch(error) {
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: error.message })
  }
}


const getProfile = async (req, res) => {
  try {
    const data = req.user;
    const { email } = data;
    const logged_user = await Board.findOne({ email }).select("-password");
    console.log("logged_user:", logged_user);
    if(!logged_user) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({
        message: "You are not authorized for this operation. Profile retrieval failed!"
      });
    }

    return res
      .status(StatusCodes.OK)
      .json({
        success: true,
        message: "Profile retrieved successfully!",
        profile: logged_user
      });
  } catch(error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message })
  }
}

const deleteProfile = async (req, res) => {
  try {
    const data = req.user;
    const { email } = data;
    const deleted_user = await Board.findOneAndDelete({ email });
    if(!deleted_user) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({
        message: "You are not authorized for this operation. Profile deletion failed!"
      });
    }
    
    return res
      .status(StatusCodes.OK)
      .json({
        success: true,
        message: "Profile deleted successfully!",
        deleted_profile: deleted_user
      });
  } catch(error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message })
  }
}


export { boardRegister, login, updateProfile, getProfile, deleteProfile };