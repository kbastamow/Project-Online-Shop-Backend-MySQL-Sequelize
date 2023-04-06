const express = require("express");
const { authentication } = require("../middleware/authentication");
const ReviewController = require("../controllers/ReviewController");
const router = express.Router();



router.post("/createReview", authentication, ReviewController.create);





module.exports = router;