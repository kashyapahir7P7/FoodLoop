const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const foodController = require("../controllers/food.controller")
const router = express.Router()
const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage()
})

/* POST /api/food/ [Protected] */
router.post("/", authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood)

/* GET /api/food/ [Protected] */
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems)

// liked and unliked food
router.post("/like", authMiddleware.authUserMiddleware, foodController.likeFood)

// save and unsave food
router.post("/save", authMiddleware.authUserMiddleware, foodController.saveFood)

// get saved food items for a user
router.get("/saved", authMiddleware.authUserMiddleware, foodController.getSavedFoodItems)

// get liked food items for a user
router.get("/liked", authMiddleware.authUserMiddleware, foodController.getLikedFoodItems)



module.exports = router
