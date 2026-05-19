const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    food: {
        type: mongoose.Schema.ObjectId,
        ref: 'Food',
        required: true
    }
}, {
    timestamps: true
})

const LikeModel = mongoose.model('like', likeSchema)

module.exports = LikeModel;