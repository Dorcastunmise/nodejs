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