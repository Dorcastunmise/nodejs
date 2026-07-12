import { StatusCodes } from "http-status-codes"

const notFound = async (req, res) => {
  res
  .status(StatusCodes.NOT_FOUND)
  .json({
    message: "Data requested does not Exist"
  });
}

export default notFound