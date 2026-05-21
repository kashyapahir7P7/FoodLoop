const followModel = require("../model/followSchema.model");

const toggleFollow = async (req, res) => {
    try {
        const userId = req.user._id; 
        const { foodPartnerId } = req.body;

        if (!foodPartnerId) {
            return res.status(400).json({ success: false, message: "Food Partner ID is required" });
        }

        const existingFollow = await followModel.findOne({ user: userId, foodPartner: foodPartnerId });

        if (existingFollow) {
            await followModel.findByIdAndDelete(existingFollow._id);
            return res.status(200).json({ success: true, isFollowing: false, message: "Unfollowed successfully" });
        } else {
            await followModel.create({ user: userId, foodPartner: foodPartnerId });
            return res.status(200).json({ success: true, isFollowing: true, message: "Followed successfully" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getPartnerFollowStats = async (req, res) => {
    try {
        const { foodPartnerId } = req.params;
        const userId = req.user ? req.user._id : null; 

        const followersCount = await followModel.countDocuments({ foodPartner: foodPartnerId });

        let isFollowing = false;
        if (userId) {
            const check = await followModel.findOne({ user: userId, foodPartner: foodPartnerId });
            if (check) isFollowing = true;
        }

        res.status(200).json({ success: true, followersCount, isFollowing });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


const getUserFollowing = async (req, res) => {
    try {
        const userId = req.user._id;

        const following = await followModel.find({ user: userId })
            .populate("foodPartner", "name contactName");

        res.status(200).json({ success: true, count: following.length, following });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { toggleFollow, getPartnerFollowStats, getUserFollowing };