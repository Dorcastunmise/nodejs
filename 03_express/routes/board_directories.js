import { Router } from "express";
import { boardRegister, login } from "../controllers/board.js";

const boardDirectoriesRouter = Router();

boardDirectoriesRouter.post("/board-register", boardRegister);
boardDirectoriesRouter.post("/login", login);

export default boardDirectoriesRouter;