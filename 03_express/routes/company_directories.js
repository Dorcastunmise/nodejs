import Router from "express"; //or require("express").Router();
//import {getCompanyExpert} from "../controllers/companies.js";
import {createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from "../controllers/companies.js";

const compRolesRouter = Router();

//Company routes
compRolesRouter.get("/company/:id", getCompanyById);
compRolesRouter.get("/companies", getAllCompanies);
compRolesRouter.post("/create-company", createCompany);
compRolesRouter.patch("/update-company/:id", updateCompany);
compRolesRouter.delete("/delete-company/:id", deleteCompany);

export default compRolesRouter;