const { Order, Product, Order_Product, User } = require("../models/index.js");


const OrderController = {

    async create(req, res) {
        //IN POSTMAN: {    "productAndQuantity":[{"ProductId": 2, "quantity": 2 }, {"ProductId": 3, "quantity": 5}]   }
        try {
            const orderArray = req.body.productAndQuantity; //array of objects
            for (pair of orderArray) {
                const product = await Product.findByPk(pair.ProductId);  //find product by ID provided and check it exists
                if (!product) {
                    return res.status(404).send({ msg: `Product with id ${pair.ProductId} not found.` })
                }
            };
            const order = await Order.create({ ...req.body, UserId: req.user.id })
            orderArray.forEach(pair => {
                order.addProduct(pair.ProductId, { through: { quantity: pair.quantity } })  //THROUGH ACCESSES OTHER COlUMNS IN JUNCTION TABLE
            })

            res.status(201).send({ msg: "Order created", order })
        } catch (error) {
            res.status(500).send(error);
        }
    },
    //Selecting only certain information to view
    async getAllJoinProducts(req, res) {
        try {
            const orders = await Order.findAll({
                attributes: [["id", "Order ID"]], //second value is alias
                include: [{ model: Product, attributes: ["name"], through: { model: Order_Product, attributes: ["quantity"] } }]
            })
            res.send(orders);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    },

    //See my orders and products - for users

    async getMyOrders(req, res) {
        try {
            const orders = await Order.findAll({
                where: {
                    UserId: req.user.id
                },
                attributes: [["updatedAt", "Order created or updated on"]],
                include: ({
                    model: Product,
                    attributes: [["name", "Name of Product"]], //THE SECOND PARAMETER IS ALIAS. NOTICE THE DOUBLE ARRAY              
                    through: { attributes: ["quantity"] }, // include 'quantity' attribute from junction table
                })
            });
            res.send(orders);

        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
}




    module.exports = OrderController;







