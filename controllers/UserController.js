const { User } = require("../models/index.js");
const bcrypt = require("bcryptjs");
// const { Op } = Sequelize;


const UserController = {
//CREATE NEW USER
    async create(req,res) {
        console.log(req.body.role);
        req.body.role = "user";
        try {
            const password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({...req.body, password});
            console.log("hello from create")
            res.status(201).send({msg:"New user created", user})  
        } catch(error) {
            console.error(error);
            res.send(error);
        }
    }

}

module.exports = UserController;





  






