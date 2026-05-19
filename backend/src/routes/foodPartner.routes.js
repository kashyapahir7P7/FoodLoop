const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const foodPartnerController = require("../controllers/foodPartner.controller")
const router = express.Router()

/* GET /api/food/foodpartner/:id */
router.get("/foodpartner/:id", authMiddleware.authUserMiddleware, foodPartnerController.getFoodItemById)

module.exports = router

