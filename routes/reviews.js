const express = require("express");
const { authentication } = require("../middleware/authentication");
const ReviewController = require("../controllers/ReviewController");
const router = express.Router();



router.post("/createReview", authentication, ReviewController.create);
router.get("/getAll", ReviewController.getAll);
router.post("/updateById/:id", authentication, ReviewController.updateById);
router.delete("/deleteById/:id", authentication, ReviewController.deleteById)


module.exports = router;