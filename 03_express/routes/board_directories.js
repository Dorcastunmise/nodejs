import { Router } from "express";
import { boardRegister, getProfile, login, updateProfile } from "../controllers/board.js";
import authorization from "../middlewares/authorization.js";

const boardDirectoriesRouter = Router();

boardDirectoriesRouter.post("/board-register", boardRegister);
boardDirectoriesRouter.post("/login", login);
boardDirectoriesRouter.post("/update-profile", authorization, updateProfile);
boardDirectoriesRouter.get("/get-profile", authorization, getProfile);

export default boardDirectoriesRouter;