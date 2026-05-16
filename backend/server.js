// start the server
require("dotenv").config();
const app = require("./src/app")
const ConnectTodb = require("./src/db/db.js")

ConnectTodb()

app.listen(3000, () => {
    console.log("server is running on port 3000")
})