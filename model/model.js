const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Phone: {
        type: Number,
        required: true,
        unique: true
    },
    Admin: {
        type: Boolean,
        default: false
    },
    Password: {
        type: String,
        required: true
    }
},
{timestamps: true}
);

let User = mongoose.model("User", UserSchema);
module.exports = {User}; 