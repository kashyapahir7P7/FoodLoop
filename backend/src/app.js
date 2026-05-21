// create the server 
const express = require("express")
const cookieParser = require("cookie-parser")
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require("./routes/food.routes")
const foodpartnerRoutes = require("./routes/foodPartner.routes")
const followRoute = require("./routes/follow.routes")
const cors = require("cors")

const app = express()
app.use(cookieParser())
app.use(express.json())

const corsOptions = {
     origin: process.env.FRONTEND_URL || "http://localhost:5173",
     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allowedHeaders: ["Content-Type", "Authorization"],
     credentials: true,
     optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.get("/", (req, res) => {
     res.send("FoodLoop API is running!")
})

app.use("/api/auth", authRoutes)
app.use("/api/food", foodRoutes)
app.use("/api/food/", foodpartnerRoutes)
app.use("/api/follow", followRoute)

module.exports = app