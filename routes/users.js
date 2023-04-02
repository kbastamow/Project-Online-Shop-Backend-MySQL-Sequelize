const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");


router.post("/createUser", UserController.create);
router.post("/login", UserController.login)
router.put("/logout", authentication, UserController.logout);
router.get("/getAll", UserController.getAll);
router.delete("/deleteById/:id", UserController.deleteById);

module.exports = router;