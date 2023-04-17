const { Product, Category, Category_Product, Review, Sequelize } = require("../models/index.js");
const { Op } = Sequelize; 

const ProductController = {
    async create(req, res, next) {
        try {
            const categoryIds = req.body.CategoryId;
            categoryIds.forEach(async (entry) => {  //Using a forEach function, necessary to add 
                const foundId = await Category.findByPk(entry);
                if (!foundId) {
                    return res.status(404).send({ msg: `Category with id ${entry} not found.` })
                }
            });
            const product = await Product.create(req.body);
            product.addCategories(req.body.CategoryId);
            res.status(201).send({ msg: "New product created", product });

        } catch (error) {
            console.error(error);
            next(error);
        }
    },

    async getAllwithAssociations(req, res) {
        try {
            const products = await Product.findAll({
                include: [{
                    model: Category,
                    attributes: ["name"],
                    through: { attributes: [] } //Adding categories to view. Specialising through: { attributes: [] } as empty excludes the junction table from the view
                }, {
                    model: Review
                }],
            });
            res.send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async findById(req, res) {
        try {
            const foundProduct = await Product.findByPk(req.params.id, {
                include: [{
                    model: Category,
                    attributes: ["name"],
                    through: { attributes: [] } //Adding categories to view. Specialising through: { attributes: [] } as empty excludes the junction table from the view
                }, {
                    model: Review
                }],
            });
            if (!foundProduct) {
                return res.status(404).send({ msg: `Products with id ${req.params.id} not found` });
            }
            res.send(foundProduct)
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },

  async findVarious(req,res) {
    try{
        const products = await Product.findAll({
            where: { id: req.body.id }   //req body should be an array
            })
        res.send(products);
    } catch(error) {
        console.error(error);
        res.status(500).send(error)
    }
  },

    async findByName(req,res) {  //COULD ADD here a search function by category TOO!
        try{
            const product = await Product.findAll({
                where: {
                    name: { [Op.like]:`%${req.params.name}%`}
                },
                include: {
                    model: Review
                }
            });
            if (!product) {
                return res.status(400).send("No product matches your search.")
            }
            res.send(product);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async findByPrice(req, res) {
        try {
            const products = await Product.findAll({
                where: {
                    price: { [Op.between]: [(+req.params.price - 50), (+req.params.price + 50)] } //RANGE +- fifty  
                }
            });
            if (!products) {
                return res.status(400).send("No product matches your search.")
            }
            res.send({ msg: `Products within price range ${+req.params.price - 50}-${+req.params.price + 50}€`, products });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async orderByPrice(req, res) {
        try {
            const products = await Product.findAll({
                order: [    //Notice double array:
                    ["price", "DESC"],
                ],
            })
            res.send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async updateById(req, res) {
        try {
            const foundProduct = await Product.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!foundProduct) {
                return res.status(400).send({ msg: `Product with id ${req.params.id} not found.` }
                )
            }
            await foundProduct.update(req.body);
            foundProduct.setCategories(req.body.CategoryId); //Update category, notice plural "Categories"!
            res.send({ msg: "Product updated", foundProduct });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async deleteById(req, res) {
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
            await Category_Product.destroy({ where: { ProductId: req.params.id } });  //Delete from junction table

            res.send({ msg: "The following product has been deleted:", foundProduct })

        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }
}

module.exports =  ProductController;