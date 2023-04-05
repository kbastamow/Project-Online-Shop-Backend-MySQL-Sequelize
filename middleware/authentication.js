const { User, Token, Sequelize } = require("../models");
const { Op } = Sequelize;
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const authentication = async (req, res, next ) => {
    try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findByPk(payload.id);
    const tokenFound = await Token.findOne({
      where: {
        [Op.and]: [{ UserId: user.id }, { token: token }],
      },
    });
    if (!tokenFound) {
      return res.status(401).send({ msg: "User unauthenticated" });
    }
    req.user = user; //THIS ONE IS USED IN controllers
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, msg: "Problem with token" });
  }
};


// Check Admin
const isAdmin = async (req, res, next) => {
  try {
      const role = req.user.role;
      if (role === "admin" || role === "superadmin") {
        next();
      } else {
        return res.status(403).send({ msg: "Unauthorised request" })
      }
      
      } catch (error) {
      console.error(error);
      res.status(500).send(error);
}
}


//Check superAdmin

const isSuperAdmin = async (req, res, next) => {
    try {
        const role = req.user.role;
        if (role !== "superadmin") {
            return res.status(403).send({ msg: "Unauthorised request" })
        }
        next();
       
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
}
}


module.exports = { authentication, isAdmin, isSuperAdmin }; //this is an object


// || !role === "superadmin"