const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyparser = require("body-parser");
const dotenv = require("dotenv");
const UserRoute = require("./Route/User");


dotenv.config();
mongoose.connect((process.env.MONGOOSE_URL), () => {
    console.log("Database is connected!");
})

app.use(cors());
app.use(morgan("common"));
app.use(bodyparser.json({ limit: "50mb" }));

app.use("/user", UserRoute);

app.listen(3007, () => {
    console.log("server is running...");
})