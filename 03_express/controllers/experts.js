import { experts } from "../data/data.js";

const home = (req, res)=> {
  res.send("Hello and welcome to your first Express Server!");
}

const dashboard = (req, res) => {
  /*
  res.send("Live Score Sheet");
  res.send("<p>Live Score Sheet</p>");
  res.sendFile("<p>Live Score Sheet</p>");
  res.json({
    name: "Timan",
    duration: 7
  });
  res.cookie('name', 'tobi', {path: '/admin'});
  res.clearcookie('name', {path: '/admin'});
  res.status(200).send("Live Score Sheet");
  */
  res.send(Buffer.from("Live Score Sheet"));
}
const getContact = (req, res) => {
 res.cookie('role', 'security', {path: '/admin'});
}

const getCareerRoles = (req, res) => {
  const query = req.query;
  const title = req.query.title;
  const gained_exp = req.query.experience;
  const expert = experts.find((expert) => expert.title.toLowerCase() == title.toLowerCase());
  
  const experience = experts.find((expert) => parseInt(expert.experience) == gained_exp);

  if(!expert || !experience) {
    return res
      .status(404)
      .json({
        success: false,
        message: `${title} or ${experience} was not found!`
      })
  }

  res
  .status(200)
  .json({
    success: true,
    data: {
      expert,
      experience
    },
    message: "Requested expert's record retrieved successfully!"
  })

}

const getEachExpertRec = (req, res) => {
  const id = req.params.id;
  const career = experts.find((career) => career.id == id);
  if(!career) {
    return res
      .status(404)
      .json({
        success: false,
        message: `Expert with id [${id}] does not exist`
      })
  }

  res
  .status(200)
  .json({
    success: true,
    data: career,
    message: "Requested expert's record retrieved successfully!"
  })
}

const getCareers = (req, res) => {
  res.json(
    { 
      success: true,
      data: experts,
      total_roles: experts.length
    });
}

const getCareerSta = (req, res) => {
  res
  .status(300)
  .json(
    { 
      success: true,
      data: experts,
      total_roles: experts.length
    });
}

const updateCareers = (req, res) => {
  let data = req.body;
  if(!data.title || !data.experience){
    return 
      res
        .status(400)
        .json({
          message: "Career's title and experience are required fields"
        })
  }

  experts.push(data);
  res
    .status(200)
    .json({
      success: true,
      message: `Career records updated successfully! New career is ${data.title}`,
      data: experts,
      total_roles: experts.length
    })
}

const updateCareer =  (req, res) => {
  let data = req.body;
  const id = parseInt(req.params.id);
  const expert = experts.find((expert) => expert.id == id);
  console.log("data = ", data);
  
  if(!data.title) {
    return res
      .status(400)
      .json({
        success: false,
        message: `Expert title is required!!`
      })
  }

  if(!expert) {
    return res
      .status(404)
      .json({
        success: false,
        message: `expert with the parsed id was not found!!`
      })
  }

  expert.title = data.title;
  res
  .status(200)
  .json({
    success: true,
    message: `Career records updated successfully! New career is ${data.title}`,
    data: expert
  })


}

const deleteCareer = (req, res)=> {
  const data = req.body;
  const {title} = data;
  if(!title) {
    return res
      .status(404)
      .json({
        success: false,
        message: `Expert with the parsed title [${title}] does not exist`
      })
  }

  const sel_expert = experts.find((expert) => expert.title.toLowerCase() === title.toLowerCase());
  if(!sel_expert) {
    return res
      .status(404)
      .json({
        success: false,
        message: `Expert with the parsed title [${title}] does not exist`
      })
  }

  const excl_experts = experts.filter((expert) => expert.title.toLowerCase() != title.toLowerCase());
  res
  .status(200)
  .json({
    success: true,
    data: excl_experts,
    message: "Requested expert's record has been removed successfully!"
  })
}

export {home, dashboard, getContact, getCareerRoles, getEachExpertRec,  getCareers, getCareerSta, updateCareers, updateCareer, deleteCareer};