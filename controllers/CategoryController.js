const { Category, Category_Product } = require("../models/index.js");


const CategoryController = {
   
    async create(req, res){
        try {
        const category = await Category.create(req.body);
        res.status(201).send({msg:"New category created", category})
    } catch(error){
        console.error(error);
        res.send(error);
    }
},

   async getAll(req, res){
    try{
        const categories = await Category.findAll();
        res.send(categories)
    } catch(error){
        console.error(error);
        res.status(500).send(error);
    }
   }, 

   async deleteById(req, res){
    try {
        const foundCat = await Category.findOne({    
            where: {
                id: req.params.id
            }
        });
        if (!foundCat) {
            return res.status(404).send({ msg: `Category with id ${req.params.id} not found` });
        }
        await foundCat.destroy();
        await Category_Product.destroy({where: {CategoryId: req.params.id}});  //THIS LINE UPDATES JUNCTION TABLE
 
        res.send({ msg: "The following category has been deleted:", foundCat})

    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
   }

}


module.exports = CategoryController