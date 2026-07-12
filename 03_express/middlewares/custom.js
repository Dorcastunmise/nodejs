import compRolesRouter from "../routes/company_directories.js";
const logger = (req, res, next) => {
  console.log("A customized middleware", req.method);
  next(); //to enable the program move to the next middleware
};

const blocker = (req, res, next) => {
  if(req.url == "/blocked") {
    return res
    .status(404)
    .json({
      success:false,
      message: `The route has been blocked by a middleware`
    });
  }
 next();
};

const setheader = (req, res, next) => {
  res.setHeader("X-PoweredBy", "Express");
  next();
};
//
const customrouter = compRolesRouter;

export {customrouter, logger, blocker, setheader};