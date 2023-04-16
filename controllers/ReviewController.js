const { Review, User, Product } = require("../models/index.js");


const ReviewController = {

    async create(req, res, next) {
        try {
            const foundProduct = await Product.findByPk (req.body.ProductId);
            if (!foundProduct) {
                return res.status(404).send({msg:`Product with id ${foundProduct} doesn't exist.`})
            }

            const review = await Review.create({ ...req.body, UserId: req.user.id, approved:false }); //default value false
            res.status(201).send({msg: `New review created`, review})
        } catch(error){
            console.error(error);
            next();
        }
    },

    async getAll(req, res) {
        try{
            const reviews = await Review.findAll({
                include: [{ 
                    model: Product, 
                    attributes: ["id", "name"]
                }, {
                    model: User,
                    attributes: ["id", "name", "surname", "email"]
                 }] 
            })

            res.send(reviews);

        } catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    },

    async approvedByAdmin(req,res) {
        try {
            const review = await Review.findByPk(req.params.id);
            review.update({approved:true});
            res.send({msg:"Review approved for publication", review });
        } catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    },
 
    async updateById(req, res) {
        try {
            const review = await Review.findByPk(req.params.id);
            if (review.UserId !== req.user.id) { 
                return res.status(401).send("Not authorised to update this review");
            }
            await review.update(req.body);
            res.send({msg: `Review updated`, review})
         } catch(error){
            console.error(error);
            res.status(500).send(error);
        }
            },


        async deleteById(req, res) {
            try {
                const review = await Review.findByPk(req.params.id);
                if (review.UserId !== req.user.id) {
                    return res.status(401).send("Not authorised to delete this review");
                }
                await review.destroy();
                res.send({msg: `Review deleted`, review})

             } catch(error){
                console.error(error);
                res.status(500).send(error);
            }
                },
        
    










}



module.exports = ReviewController;
