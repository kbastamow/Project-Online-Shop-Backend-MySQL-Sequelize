const { User, Order, Token, Product, Sequelize } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"]
const { Op } = Sequelize;
const transporter = require("../config/nodemailer");



const UserController = {
//CREATE NEW USER
    async create(req, res) {
        req.body.role = "user"; //default
        try {
            const password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({ ...req.body, password, confirmed: false }); //confirmed - false is default

            const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '24h' })
            const url = 'http://localhost:3000/users/confirm/' + emailToken  //emailToken - encrypted email   

            await transporter.sendMail({   //Send email of confirmation
                to: req.body.email,
                subject: "Confirm your email to complete your registration",
                html: `<h3>You're nearly there</h3>
                    <a href="${url}">Click here to start shopping!</a>
                    <p>This link will expire in 24 hours</p>
                    `,
            });
            res.status(201).send({
                msg: "Email of confirmation sent",
                user,
            });

        } catch (error) {
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
            if(!user.confirmed){  //check if user has confirmed their registration by email link
                return res.status(400).send({msg:"Check your email to complete your registration"})
            }

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

    },
    //change confirmation after registration
    async confirm(req, res) {
        try {
            const token = req.params.emailToken   //Token from address bar
            const payload = jwt.verify(token, jwt_secret) //check against our signature
            User.update({ confirmed: true }, {
                where: {
                    email: payload.email  //we get the email from the payload
                }
            })
            res.status(200).send({ msg: "Registration completed" });

        } catch (error) {
            console.error(error)
        }

    },
    
  //seeAll
     async getAll(req,res){
        try{
            const users = await User.findAll
            ({
                include: [Order],
            });
            res.send(users);
        } catch(error) {
            console.error(error);
            res.status(500).send("error");
        }
     },

 //Update User
 async updateById(req, res) {
    try {
        const foundUser = await User.findOne({    //FIRST we check if the user with that Id actually exists!
            where: {
                id: req.params.id
            }
        });
        if (!foundUser) {
            return res.status(404).send({ msg: `User with id ${req.params.id} not found` });
        }
        await foundUser.update(req.body);  
        res.send({ msg: "User details updated", foundUser})
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
},

    //Delete User
    async deleteById(req, res) {
        try {
            const foundUser = await User.findOne({    //FIRST we check if the user with that Id actually exists!
                where: {
                    id: req.params.id
                }
            });
            if (!foundUser) {
                return res.status(404).send({ msg: `User with id ${req.params.id} not found` });
            }
            await foundUser.destroy()  //I'm calling destroy directly in the variable defined above!
            res.send({ msg: "The following user has been deleted:", foundUser})
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
  //see orders and products

  async getUserJoinOrders(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include:[{ model: Order, include: [{model: Product}]}],  
    });
      res.send(user);
    } catch(error){
        console.error(error);
        res.status(500).send(error);
    }
  },

  async getUserJoinOrdersConcise(req, res) {
        try {
      const user = await User.findByPk(req.params.id, {
        attributes: ["id","name", "surname", "email"],
        include:[{ 
            model: Order, 
            attributes:["id"], 
            include: [{model: Product, attributes: ["name"]}]
      }] 
        });
      res.send(user);
    } catch(error){
        console.error(error);
        res.status(500).send(error);
    }
  }







}





module.exports = UserController;





  






