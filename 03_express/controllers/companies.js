/*
import { experts,companies } from "../data/data.js";

const getCompanyExpert = (req, res) => {
  const expertid = parseInt(req.params.expertid);
  const companyid = parseInt(req.params.companyid);

  const company = companies.find((company) => company.id == companyid);
  const expert = experts.find((expert) => expert.id == expertid);

  if(!company || !expert) {
  return res
    .status(404)
    .json({
      success: false,
      message: `Expert with parsed id [${companyid}] or Experts with the parsed id [${companyid}] do not exist`
    })
  }

  res
  .status(200)
  .json({
    success: true,
    data: {
      company,
      expert
    },
    message: "Requested expert's record retrieved successfully!"
  })
}

export {getCompanyExpert};
*/

import Companies from "../model/CompanySchema.js";
import {StatusCodes} from "http-status-codes";

const allowedFields = ["name", "industry", "location", "founded", "employees"];

//Real Implementation
const CompanyModel = Companies;
const createCompany = async(req, res) => {
  const data = req.body;
  if(!data.name || !data.industry || !data.location || !data.founded || !data.employees) {
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({
      success: false,
      message: "All fields are required: name, industry, location, founded, employees"
    })
  }

  try {
    const newCompany = await CompanyModel.create(data);

    return res
      .status(StatusCodes.CREATED)
      .json({
        success: true,
        message: "Company created successfully",
        data: newCompany
      });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: "Database operation failed",
        error: error.message
      });
  }
}

const getCompanyById = async(req, res) => {
  const id = req.params.id;
  try {
    const company = await CompanyModel.findById(id);
    if(!company || company.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({
          success: false,
          message: "No companies found",
          data: company
        });
    }

    return res
      .status(StatusCodes.OK)
      .json({
        success: true,
        data: company
      });
  }
  catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: "Database operation failed",
        error: error.message
      });
  }
}

const getAllCompanies = async(req, res) => {
  try {
    const companies = await CompanyModel.find();
    if (companies.length === 0) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({
        success: false,
        message: "No companies found!"
      })
    }

    return res
    .status(StatusCodes.OK)
    .json({
      success: true,
      message: "All companies retrieved successfully",
      data: companies
    });
  } 
  catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: "Database operation failed",
        error: error.message
      });
  }
}

const deleteCompany = async(req, res) => {
  const id = req.params.id;
  try{
    const selcompany = await CompanyModel.findByIdAndDelete(id);
    if(!selcompany) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({
        success: false,
        message: `Requested company's record (${id}) does not exist. Try again with another ID`
      })
    }

    return res
    .status(StatusCodes.OK)
    .json({
      success: true,
      message: `Parsed company has been removed successfully!!`,
      companies_rec: selcompany 
    })
  }
  catch(err){
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: "Database operation failed",
        error: err.message
      });
  }
}


const updateCompany = async(req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updates = {};
   for (const key of allowedFields) {
    if (data[key] !== undefined) {
      updates[key] = data[key];
    }
  }
  if (Object.keys(updates).length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "All fields must be provided to update"
    });
  }


  try{
    const selcompany = await CompanyModel.findByIdAndUpdate(id, updates, {new: true, runValidators: true});
    console.log("updated company:", selcompany);
    /* 
      or
        const selcompany = await CompanyModel.findById(id);
        selcompany.name = data.name
        await selcompany.save();

    */
    if(!selcompany) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({
        success: false,
        message: `Requested company's record (${id}) does not exist. Try again with another ID`
      })
    }

    return res
    .status(StatusCodes.OK)
    .json({
      success: true,
      message: `Parsed company has been updated successfully!!`,
      companies_rec: selcompany 
    })
  }
  catch(err){
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: "Database operation failed",
        error: err.message
      });
  }
}

export { createCompany, getCompanyById, getAllCompanies, deleteCompany, updateCompany};