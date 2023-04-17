const express = require("express");
const ProductController = require("../controllers/ProductController");
const upload = require("../middleware/upload");
const router = express.Router();
const { authentication, isAdmin } = require("../middleware/authentication");


router.post("/createProduct", upload.single("image"), ProductController.create);
router.get("/getAllwithAssociations", ProductController.getAllwithAssociations);
router.get("/findByName/:name", ProductController.findByName);
router.get("/findByPrice/:price", ProductController.findByPrice);
router.get("/orderByPrice", ProductController.orderByPrice);
router.get("/findById/:id", ProductController.findById);
router.post("/findVarious", ProductController.findVarious) //must be post as I'm passing searched ids in the body
router.post("/updateById/:id", authentication, isAdmin, ProductController.updateById);
router.delete("/deleteById/:id", authentication, isAdmin, ProductController.deleteById);


// authentication, isAdmin,

module.exports = router;
