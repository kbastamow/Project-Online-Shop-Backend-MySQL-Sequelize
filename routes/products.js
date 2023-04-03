const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();


router.post("/createProduct", ProductController.create);
router.get("/getAllJoinCategories", ProductController.getAllJoinCategories);
router.post("/updateById/:id", ProductController.update);
router.delete("/deleteById/:id", ProductController.deleteById);
router.get("/findByName/:name", ProductController.findByName);
router.get("/findByPrice/:price", ProductController.findByPrice);
router.get("/orderByPrice", ProductController.orderByPrice);




module.exports = router;
