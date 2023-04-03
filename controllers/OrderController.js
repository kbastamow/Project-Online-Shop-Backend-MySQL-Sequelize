const { Order, Product, Order_Product, User } = require("../models/index.js");


const OrderController = { 

    async create(req,res){
        try{
       req.body.UserId = req.user.id; //THIS IS NOT WORKING (SHOULD BE Default, can be overridden by specifying user in req)
       const order = await Order.create(req.body)
       order.addProduct(req.body.ProductId); //products   
       
        res.status(201).send({msg: "Order created", order})
    } catch(error){
        res.status(500).send(error);
    } 

}

// try {
//     const book = await Book.create(req.body);
//     book.addGenre(req.body.GenreId); //para insertar en la tabla intermedia
//     res.send(book);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }





// const { name, price, description, image, categoryIds } = req.body;
                      
// const product = await Product.create({
//     name, 
//     price: price || null,  //default values if no value is provided (optional fields)
//     description: description || null,
//     image: image || null
// });

// for (const categoryId of categoryIds) {  //loop through categoryIds (array) to map product to multiple categories
//     await product.addCategory(categoryId);
//   }








    // BELOW NOT WORKING FOR JUNCTION TABLE


//    async create(req,res){  //RIGHT NOW THE CODE allows a logged in user to create orders (can't be created by admin, for example)
//     try{
//         const productAndQuantity = req.body; //POSTMAN: [  { "productId": 1, "quantity": 2 },  { "productId": 2, "quantity": 1 },  { "productId": 3, "quantity": 3 }]       
//         const order = await Order.build();  //BUILD METHOD MAKES THE ORDER BUT DOESN'T SAVE IT IMMEDIATELY
//         order.UserId = req.user.id; //Take userId from authentication
//         for (pair of productAndQuantity) {
//             const product = await Product.findByPk(pair.productId);  //find product by ID provided and check it exists
//             console.log(product.name);
            
//             if(!product){
//                 return res.status(400).send({msg:`Product with id ${pair.productId} not found.`})
//             }
//             await order.addProduct(product, { through: { quantity: productAndQuantity.quantity }});  //THROUGH ACCESSES OTHER COlUMNS IN JUNCTION TABLE
//             console.log(productAndQuantity.quantity);
//         }
//         await order.save(); //THIS saves the order once it's been updated with the loop
//         res.status(201).send({msg: "New order created", order});

// // order.addProduct





//     }catch(error) {
//         console.error(error);
//         res.status(500).send(error);
//     }
//    }
}



    module.exports = OrderController;











