const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication, isAdmin, isSuperAdmin } = require("../middleware/authentication");


router.post("/createUser", UserController.create);
router.get("/confirm/:emailToken",UserController.confirm)
router.post("/login", UserController.login)
router.put("/logout", authentication, UserController.logout);


router.get("/getAll",authentication, isAdmin, UserController.getAll);
router.get("/getUserJoinOrder/:id",  UserController.getUserJoinOrders);
router.get("/userOrderProducts/:id",  UserController.getUserJoinOrdersConcise)
router.post("/updateById/:id", authentication, isAdmin, UserController.updateById);
router.delete("/deleteById/:id", authentication, isSuperAdmin, UserController.deleteById);


module.exports = router;