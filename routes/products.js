const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();
const { authentication, isAdmin } = require("../middleware/authentication");


router.post("/createProduct", authentication, isAdmin, ProductController.create);
router.get("/getAllwithAssociations", ProductController.getAllwithAssociations);
router.get("/findByName/:name", ProductController.findByName);
router.get("/findByPrice/:price", ProductController.findByPrice);
router.get("/orderByPrice", ProductController.orderByPrice);
router.get("/findById/:id", ProductController.findById);
router.post("/updateById/:id", authentication, isAdmin, ProductController.updateById);
router.delete("/deleteById/:id", authentication, isAdmin, ProductController.deleteById);




module.exports = router;
