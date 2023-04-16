const { Category, Product, Category_Product, Sequelize } = require("../models/index.js");
const { Op } = Sequelize; 

const CategoryController = {

    async create(req, res) {
        try {
            const category = await Category.create(req.body);
            res.status(201).send({ msg: "New category created", category })
        } catch (error) {
            console.error(error);
            res.send(error);
        }
    },

    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            res.send(categories)
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async getAllJoinProducts(req, res) {
        try {
            const categories = await Category.findAll({
                include: [{ model: Product }]
            });
            res.send(categories)
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async findById(req, res) {
        try {
            const foundCat = await Category.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!foundCat) {
                return res.status(404).send({ msg: `Category with id ${req.params.id} not found` });
            }
            res.send(foundCat)

        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },

    async findByName(req, res) {
        try {
            const category = await Category.findAll({
                where: {
                    name: { [Op.like]: `%${req.params.name}%` }
                }
            });
            if (!category) {
                return res.status(404).send("No category matches your search.")
            }
            res.send(category);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async update(req, res) {
        try {
            const foundCat = await Category.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!foundCat) {
                return res.status(404).send({ msg: `Category with id ${req.params.id} not found.` }
                )
            }
            await foundCat.update(req.body);
            res.send({ msg: "Product updated", foundCat });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },


    async deleteById(req, res) {
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
            await Category_Product.destroy({ where: { CategoryId: req.params.id } });  //THIS LINE UPDATES JUNCTION TABLE

            res.send({ msg: "The following category has been deleted:", foundCat })

        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },


}


module.exports = CategoryController