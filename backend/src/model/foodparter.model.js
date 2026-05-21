const mongoose = require("mongoose")

const foodparterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    contactName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    openingTime: { type: String, default: "09:00" },
    closingTime: { type: String, default: "22:00" },
    cuisines: [{ type: String }]
})

const foodParterModel = mongoose.model("foodparter", foodparterSchema)

module.exports = foodParterModel