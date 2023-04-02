const { Product, Category } = require("../models/index.js");

const ProductController = { 
    async create(req, res){
        try{
            const product = await Product.create(req.body);
            await product.addCategory(req.body.CategoryId);
            res.status(201).send({msg:"New product created", product }); 
        }catch(error){
            console.log(error);
            res.status(500).send(error);
        }
    }


 

}

module.exports = ProductController;