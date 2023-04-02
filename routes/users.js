const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middleware/authentication");


router.post("/createUser", UserController.create);
router.post("/login", UserController.login)
router.put("/logout", authentication, UserController.logout);
router.get("/getAll", UserController.getAll);
router.delete("/deleteById/:id", UserController.deleteById);

module.exports = router;