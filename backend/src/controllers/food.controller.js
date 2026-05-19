const foodModel = require("../model/food.model")
const storageService = require("../services/storage.service")
const { v4: uuid } = require("uuid")
const SaveModel = require('../model/save.model')
const UserModel = require("../model/user.model")
const LikeModel = require("../model/likes.model")

async function createFood(req, res) {


    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })

}

async function getFoodItems(req, res) {

    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Foods items fetch successfully",
        foodItems
    })

}

async function likeFood(req, res) {

    const { foodId } = req.body
    const user = req.user

    const IsAlreadyLiked = await LikeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (IsAlreadyLiked) {
        await LikeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully",
            liked: false
        })
    }

    const like = await LikeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: +1 }
    })

    res.status(200).json({
        message: "Food liked successfully",
        liked: true,
        like
    })

}

async function saveFood(req, res) {
    const { foodId } = req.body
    const user = req.user

    const IsAlreadySaved = await SaveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (IsAlreadySaved) {
        await SaveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { saveCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully",
            saved: false
        })
    }

    const save = await SaveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { saveCount: +1 }
    })

    res.status(200).json({
        message: "Food saved successfully",
        saved: true,
        save
    })
}

async function getSavedFoodItems(req, res) {
    const user = req.user

    const savedItems = await SaveModel.find({ user: user._id }).populate("food")

    if (!savedItems || savedItems.length === 0) {
        return res.status(200).json({
            message: "No saved food items found",
            savedItems: []
        })
    }

    res.status(200).json({
        message: "Saved food items fetched successfully",
        savedItems
    })
}

async function getUserProfile(req, res) {
    const user = await UserModel.findById(req.user._id)
    const likedCount = await LikeModel.countDocuments({
        user: req.user._id
    })
    const savedCount = await SaveModel.countDocuments({
        user: req.user._id
    })
    res.status(200).json({
        message: "User profile fetched successfully",
        user,
        likedCount,
        savedCount
    })
}

async function getLikedFoodItems(req, res) {
    const user = req.user

    const likedItems = await LikeModel.find({ user: user._id }).populate("food")

    if (!likedItems || likedItems.length === 0) {
        return res.status(200).json({
            message: "No liked food items found",
            likedItems: []
        })
    }

    res.status(200).json({
        message: "Liked food items fetched successfully",
        likedItems
    })
}

module.exports = { createFood, getFoodItems, likeFood, saveFood, getSavedFoodItems, getUserProfile, getLikedFoodItems }