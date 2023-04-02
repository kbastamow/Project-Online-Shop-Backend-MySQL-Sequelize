const { User, Token, Sequelize } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"]
const { Op } = Sequelize;


const UserController = {
//CREATE NEW USER
    async create(req,res) {
        console.log(req.body.role); //CHECK and DELETE
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
    },
//Create login
    async login(req, res) {
        try {
            const user = await User.findOne({
                where: { email:req.body.email }
            });
            if (!user) {
                return res.status(400).send("Incorrect email or password");//return so the code breaks here
            }
            console.log(req.body.password);
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                res.status(400).send("Incorrect email or password");
            }
            const token = jwt.sign({ id: user.id }, jwt_secret); // create token
            Token.create({ token, UserId: user.id }); //save to table - remember to import on top!
            res.send({ token, msg: `Welcome ${user.name}`, user });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    //logout
    async logout(req,res){  //Create authentication before creating logout, so req.user.id doesn't appear undefined
        console.log(req.user);
        try{
          console.log(req.headers.authorization);  
          await Token.destroy({   //destroying the token
            where: {
                [Op.and]: [
                    {UserId: req.user.id},
                    {token: req.headers.authorization}
                ]
            }
          });
           res.send({ msg: "Logged out" });
        }catch(error) {
            console.error(error);
            res.status(500).send("Error logging out");
        }

    }
  //next method here...



        }

    



module.exports = UserController;





  






