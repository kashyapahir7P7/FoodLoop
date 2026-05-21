const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow.Controller");
const authMiddleware = require("../middlewares/auth.middleware"); 

// follow and unfollow toggle route
router.post("/toggle", authMiddleware.authUserMiddleware, followController.toggleFollow);

// foodpartner stats route - followers count and if current user is following or not
router.get("/status/:foodPartnerId", authMiddleware.authUserMiddleware, followController.getPartnerFollowStats);

// user's own following route
router.get("/my-following", authMiddleware.authUserMiddleware, followController.getUserFollowing);

module.exports = router;