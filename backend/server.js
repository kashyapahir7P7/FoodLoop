// start the server
require("dotenv").config();
const app = require("./src/app")
const ConnectTodb = require("./src/db/db.js")

ConnectTodb()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})