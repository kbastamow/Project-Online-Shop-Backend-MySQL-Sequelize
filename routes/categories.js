const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const { authentication, isAdmin } = require("../middleware/authentication");
const router = express.Router();



router.post("/createCategory", authentication, isAdmin, CategoryController.create);
router.get("/getAll", CategoryController.getAll);
router.delete("/deleteById/:id", authentication, isAdmin, CategoryController.deleteById);
router.post("/updateById/:id", authentication, isAdmin, CategoryController.update);
router.get("/getAllJoinProducts", CategoryController.getAllJoinProducts)
router.get("/findById/:id", CategoryController.findById);
router.get("/findByName/:name", CategoryController.findByName)




module.exports = router;