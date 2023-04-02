const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");


router.post("/createUser", UserController.create);
router.post("/login", UserController.login)
router.put("/logout", authentication, UserController.logout);

module.exports = router;