const { Review, User, Product } = require("../models/index.js");


const ReviewController = {

    async create(req, res, next) {
        try {
            const foundProduct = await Product.findByPk (req.body.ProductId);
            if (!foundProduct) {
                return res.status(404).send({msg:`Product with id ${foundProduct} doesn't exist.`})
            }

            // if (req.body.stars < 0 || req.body.stars  )
            const review = await Review.create({ ...req.body, UserId: req.user.id });
            res.status(201).send({msg: `New review created`, review})
        } catch(error){
            console.error(error);
            next();
        }
    }










}



module.exports = ReviewController;
