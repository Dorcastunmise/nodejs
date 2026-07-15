import Router from "express"; //or require("express").Router();
//import {getCompanyExpert} from "../controllers/companies.js";
import {createCompany, deleteCompany, getAllBoardCompanies, getAllCompanies, getCompanyById, updateCompany } from "../controllers/companies.js";
import authorization from "../middlewares/authorization.js";

const compRolesRouter = Router();

//Company routes
compRolesRouter.get("/retrieve-company/:id", getCompanyById);
compRolesRouter.get("/retrieve-companies", getAllCompanies);
compRolesRouter.patch("/update-company/:id", updateCompany);
compRolesRouter.delete("/delete-company/:id", deleteCompany);

compRolesRouter.use(authorization); // Apply authorization middleware to all routes below this line

compRolesRouter.get("/retrieve-board-companies", getAllBoardCompanies);
compRolesRouter.post("/create-company", createCompany);

export default compRolesRouter;