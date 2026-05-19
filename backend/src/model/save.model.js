const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },

    food: {
        type: mongoose.Schema.ObjectId,
        ref: 'Food',
    }

}, {
    timestamps: true
});

const SaveModel = mongoose.model('Save', saveSchema);

module.exports = SaveModel;