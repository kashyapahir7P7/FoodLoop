const foodPartnerModel = require("../model/foodparter.model")
const foodModel = require("../model/food.model")

async function getFoodItemById(req, res) {

    const foodPartnerId = req.params.id

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    const foodItemByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId })

    if (!foodPartner) {
        return res.status(400).json({
            message: "Food partner not found!"
        })
    }

    res.status(200).json({
        message: "Food partner retrived successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemByFoodPartner
        }
    })

}

module.exports = { getFoodItemById }