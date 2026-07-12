import Board from '../model/BoardSchema.js';
import {StatusCodes} from "http-status-codes";
import bcrypt from "bcrypt";

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
    const board_mem = await Board.findOne({ email});
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

    return res
    .status(StatusCodes.OK)
    .json({
      success: true,
      message: "Login successful!",
      data: board_mem
    });
  }
  catch(error) {
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: error.message })
  }

}
export { boardRegister, login };