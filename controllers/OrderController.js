const { Order, Order_Product, Product, User } = require("../models/index.js");


const OrderController = {
   async create(req,res){
    try{
        const productAndQuantity = req.body; //POSTMAN: [  { "productId": 1, "quantity": 2 },  { "productId": 2, "quantity": 1 },  { "productId": 3, "quantity": 3 }]       
        const order = await Order.build();  //BUILD METHOD MAKES THE ORDER BUT DOESN'T SAVE IT IMMEDIATELY
        order.UserId = req.user.id; //Take userId from authentication
        for (pair of productAndQuantity) {
            const product = await Product.findByPk(pair.productId);  //find product by ID provided and check it exists
            if(!product){
                return res.status(400).send({msg:`Product with id ${pair.productId} not found.`})
            }
            await order.addProduct(product, { through: { quantity: productAndQuantity.quantity }});  //THROUGH ACCESSES OTHER COlUMNS IN JUNCTION TABLE
        }
        await order.save(); //THIS saves the order once it's been updated with the loop
        res.status(201).send({msg: "New order created", order});

    }catch(error) {
        console.error(error);
        res.status(500).send(error);
    }
   }
}

    //     try{
    //         const { name, price, description, image, categoryIds } = req.body;
                      
    //         const product = await Product.create({
    //             name, 
    //             price: price || null,  //default values if no value is provided (optional fields)
    //             description: description || null,
    //             image: image || null
    //         });

    //         for (const categoryId of categoryIds) {  //loop through categoryIds (array) to map product to multiple categories
    //             await product.addCategory(categoryId);
    //           }
    //         res.status(201).send({msg:"New product created", product }); 
    //     }catch(error){
    //         console.log(error);
    //         res.status(500).send(error);
    //     }
    // },
     

    module.exports = OrderController;











