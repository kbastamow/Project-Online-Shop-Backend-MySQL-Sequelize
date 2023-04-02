const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();



router.post("/createCategory", CategoryController.create);
router.get("/getAll", CategoryController.getAll);
router.delete("/deleteById/:id", CategoryController.deleteById);

module.exports = router;