const userModel = require("../model/user.model")
const foodParterModel = require("../model/foodparter.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const cookieOptions = {
    httpOnly: true,
    secure: true,        
    sameSite: 'none'     
}

async function RegisterUserController(req, res) {
    const { fullName, email, password } = req.body

    const IsuseralreadyExist = await userModel.findOne({ email })

    if (IsuseralreadyExist) {
        return res.status(400).json({
            message: "user already exist"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ fullName, email, password: hashPassword })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token, cookieOptions)

    res.status(201).json({
        message: "User registred successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function LoginUserController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password!"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email or password!"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            fullName: user.fullName,
            id: user._id,
            email: user.email
        }
    })
}

async function LogoutUserController(req, res) {
    res.clearCookie("token", cookieOptions)
    res.status(200).json({
        message: "User logged out successfully!"
    })
}

async function RegisterFoodPartner(req, res) {
    const { name, email, password, contactName, phone } = req.body

    const IsuseralreadyExist = await foodParterModel.findOne({ email })

    if (IsuseralreadyExist) {
        res.status(400).json({
            message: "Foodparter account already exist!"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const foodPartner = await foodParterModel.create({ email, name, password: hashPassword, contactName, phone })

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET)
    
    res.cookie("token", token, cookieOptions)

    res.status(201).json({
        message: "Food partner registred successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            contactName : foodPartner.contactName,
            phone: foodPartner.phone
        }
    })
}

async function LoginFoodPartner(req, res) {
    const { email, password } = req.body

    const foodpartner = await foodParterModel.findOne({ email })

    if (!foodpartner) {
        return res.status(401).json({
            message: "Invalid email or password!"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodpartner.password)

    if (!isPasswordValid) {
        res.status(400).json({
            message: "Invalid user and password!"
        })
    }

    const token = jwt.sign({ id: foodpartner._id }, process.env.JWT_SECRET)
    
    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        message: "FoodPartner logged in successfully!",
        foodpartner: {
            name: foodpartner.name,
            id: foodpartner._id,
            email: foodpartner.email
        }
    })
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token", cookieOptions)
    res.status(200).json({
        message: "FoodPartner logged out successfully!"
    })
}

module.exports = { RegisterUserController, LoginUserController, LogoutUserController, RegisterFoodPartner, LoginFoodPartner, logoutFoodPartner }