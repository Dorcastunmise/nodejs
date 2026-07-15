import {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";

const authorization =  (req, res, next) => {
  const auth_header = req.headers.authorization; 
  if(!auth_header || !auth_header.startsWith("Bearer ")) {
    return res
    .status(StatusCodes.BAD_GATEWAY)
    .json({
      message: "Please provide token"
    })
  }

  const auth_token = auth_header.split(" ")[1]; 
  const decoded_token = jwt.verify(auth_token, process.env.JWT_SECRET);
  req.user = decoded_token;

  next();

}

export default authorization