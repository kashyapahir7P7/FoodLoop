const express = require("express")
const authController = require("../controllers/auth.controller")

const router = express.Router()

// User Auth API
router.post("/user/register", authController.RegisterUserController)
router.post("/user/login", authController.LoginUserController)
router.post("/user/logout", authController.LogoutUserController)

// FoodPartner Auth API
router.post("/foodpartner/register", authController.RegisterFoodPartner)
router.post("/foodpartner/login", authController.LoginFoodPartner)
router.post("/foodpartner/logout", authController.logoutFoodPartner)

module.exports = router