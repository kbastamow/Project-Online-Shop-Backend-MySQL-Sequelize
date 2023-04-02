const { Product, Category } = require("../models/index.js");

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
                include: [{ model: Category, through: { attributes: [] } }],  //Adding categories to view
              });
            res.send(products);
        }catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    }
}

module.exports = ProductController;