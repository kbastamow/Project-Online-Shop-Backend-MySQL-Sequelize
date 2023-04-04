const { Product, Category, Category_Product, Sequelize } = require("../models/index.js");
const { Op } = Sequelize; 



const ProductController = { 
    async create(req, res){
       /*I break the object sent through body apart so that I can extract categoryIds from postman.
       They allow me to include more than one category on one go */
        try{
            const { name, price, description, image, categoryIds } = req.body;
                      
            const product = await Product.create({
                name, 
                price: price || null,  //default values if no value is provided (optional fields)
                description: description || null,
                image: image || null
            });

            for (const categoryId of categoryIds) {  //loop through categoryIds (array) to map product to multiple categories
                await product.addCategory(categoryId);
              }
            res.status(201).send({msg:"New product created", product }); 
        }catch(error){
            console.log(error);
            res.status(500).send(error);
        }
    },

    async getAllJoinCategories(req,res) {
        try{
            const products = await Product.findAll({
                include: [{ model: Category, attributes:["name"], through: { attributes: [] } }],  //Adding categories to view. Specialising through: { attributes: [] } as empty excludes the junction table from the view
              });
            res.send(products);
        }catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    },

    async findByName(req,res) {  //COULD ADD here a search function by category TOO!
        try{
            const product = await Product.findAll({
                where: {
                    name: { [Op.like]:`%${req.params.name}%`}
                }
            });
            if(!product){
                return res.status(400).send("No product matches your search.")
            }
            res.send(product);
        }catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    },

    async findByPrice(req,res) {  //COULD ADD here a search function by category TOO!
        try{
           const products = await Product.findAll({
                where: {
                    price: { [Op.between]:[(+req.params.price - 50), (+req.params.price + 50)] } //RANGE +- hundred  
            }
        });
            if(!products){
                return res.status(400).send("No product matches your search.")
            }
            res.send(products);
        }catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    },

    async orderByPrice(req,res){
        try{
           const products = await Product.findAll({
                order: [    //Notice double array
                    ["price", "DESC"],
                ],
               
            })
            res.send(products);


        }catch(error){
            console.error(error);
            res.status(500).send(error);
    }
},


   async update(req,res){  //HERE I SHOULD ADD LOOP FOR UPDATING CATEGORY TOO!
        try{
           const foundProduct = await Product.findOne({    
                where: {
                    id: req.params.id
                }
            });
            if (!foundProduct) {
                return res.status(400).send({msg: `Product with id ${req.params.id} not found.`}
            )}
            await foundProduct.update(req.body);
            res.send({msg:"Product updated", foundProduct});
        } catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    },

    async deleteById(req, res){
        try {
            const foundProduct = await Product.findOne({    
                where: {
                    id: req.params.id
                }
            });
            if (!foundProduct) {
                return res.status(404).send({ msg: `Product with id ${req.params.id} not found` });
            }
            await foundProduct.destroy();
            // await Category_Product.destroy({where: {ProductId: req.params.id}});  //THIS LINE UPDATES JUNCTION TABLE
     
            res.send({ msg: "The following product has been deleted:", foundProduct})
    
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
       }



}

module.exports =  ProductController;