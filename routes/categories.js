const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();



router.post("/createCategory", CategoryController.create);
router.get("/getAll", CategoryController.getAll);
router.delete("/deleteById/:id", CategoryController.deleteById);
router.post("/updateById/:id", CategoryController.update);
router.get("/getAllJoinProducts", CategoryController.getAllJoinProducts)
router.get("/findById/:id", CategoryController.findById);
router.get("/findByName/:name", CategoryController.findByName)




module.exports = router;