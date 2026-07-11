import Router from "express"; //or require("express").Router();
import {dashboard, getCareerRoles, getContact, getCareers, getCareerSta, getEachExpertRec, home, updateCareers, updateCareer, deleteCareer } from "../controllers/experts.js";
import {getCompanyExpert} from "../controllers/companies.js";

const rolesRouter = Router();

rolesRouter.get("/get-careers", getCareerRoles);
rolesRouter.get("/careers", getCareers);
rolesRouter.get("/careers/:id", getEachExpertRec);
rolesRouter.get("/companies/:companyid/careers/:expertid", getCompanyExpert);
rolesRouter.get("/career_status", getCareerSta);
rolesRouter.get("/", home);
rolesRouter.get("/dashboard", dashboard);
rolesRouter.get("/contact", getContact);
rolesRouter.post("/careers", updateCareers);
rolesRouter.patch("/update-career/:id",updateCareer);
rolesRouter.delete("/delete-role", deleteCareer);

export default rolesRouter;