import JWT from "jsonwebtoken";
import User from "../model/User.js";

const auth_middleware = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    console.log(token);
   
    const verify = JWT.verify(token, process.env.SECRET_KEY);
    console.log(verify);
    if (verify) {
      req.id = verify.tokenuser.id;
      req.role = verify.tokenuser.role;

      next();
      return;
    } else {
      res.status(404).send({
        success: false,
        message: "un authorized",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const admin = req.role;
    if (admin !== true) {
      res
        .status(404)
        .send({ success: false, message: "un authorization admin" });
    } else {
      next();
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login middleware",
      error,
    });
  }
};

export { auth_middleware, isAdmin };
