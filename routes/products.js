const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();


router.post("/createProduct", ProductController.create);
router.get("/getAllJoinCategories", ProductController.getAllJoinCategories);
router.get("/findByName/:name", ProductController.findByName);
router.get("/findByPrice/:price", ProductController.findByPrice);
router.get("/orderByPrice", ProductController.orderByPrice);
router.get("/findById/:id", ProductController.findById);
router.post("/updateById/:id", ProductController.updateById);
router.delete("/deleteById/:id", ProductController.deleteById);




module.exports = router;
