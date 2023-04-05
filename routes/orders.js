const express = require("express");
const OrderController = require("../controllers/OrderController");
const { authentication, isAdmin } = require("../middleware/authentication");
const router = express.Router();



router.post("/create", authentication, OrderController.create);
router.get("/getAllJoinProducts", authentication, isAdmin, OrderController.getAllJoinProducts);
router.get("/getMyOrders", authentication, OrderController.getMyOrders);





module.exports = router;