const { Order, Product, Order_Product, User } = require("../models/index.js");


const OrderController = {

    async create(req, res) {
        //IN POSTMAN: {    "productAndQuantity":[{"ProductId": 2, "quantity": 2 }, {"ProductId": 3, "quantity": 5}]   }
        try {
            req.body.UserId = req.user.id; //THIS IS NOT WORKING (SHOULD BE Default, can be overridden by specifying user in req)
            const orderArray = req.body.productAndQuantity; //array of objects
            for (pair of orderArray) {
                const product = await Product.findByPk(pair.ProductId);  //find product by ID provided and check it exists
                if (!product) {
                    return res.status(400).send({ msg: `Product with id ${pair.ProductId} not found.` })
                }
            };
            const order = await Order.create(req.body)
            orderArray.forEach(pair => {
                order.addProduct(pair.ProductId, { through: { quantity: pair.quantity } })  //THROUGH ACCESSES OTHER COlUMNS IN JUNCTION TABLE
            })

            res.status(201).send({ msg: "Order created", order })
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getAllJoinProducts(req, res) {
        try {
            const orders = await Order.findAll({
                attributes: ["id"],
                include: [{ model: Product, attributes: ["name"], through: { model: Order_Product, attributes: ["quantity"] } }]
            })
            res.send(orders);
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }
}




    module.exports = OrderController;







