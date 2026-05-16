const mongoose = require("mongoose");

function ConnectTodb() {
    // Notice I changed 'mongoose://' to 'mongodb://' here!
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });
}

module.exports = ConnectTodb;