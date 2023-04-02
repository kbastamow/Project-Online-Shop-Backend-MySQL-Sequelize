const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();


router.post("/createProduct", ProductController.create);
router.get("/getAllJoinCategories", ProductController.getAllJoinCategories);

module.exports = router;
