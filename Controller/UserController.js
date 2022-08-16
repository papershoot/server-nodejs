const { User } = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const UserController = {
    //add Register:
    addUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.Password, salt);

            //create User
            const savedUser = await new User({
                Name: req.body.Name,
                Email: req.body.Email,
                Phone: req.body.Phone,
                Password: hashed,
            }).save();
            res.status(200).json(savedUser);

        }
        catch (e) {
            res.status(500).json(e);
        }
    },

    //generate accesstoken
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            Admin: user.Admin,
            Name: user.Name
        },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30d" }
        )
    },
    //generate refreshtoken
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            Admin: user.Admin,
            Name: user.Name
        },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "365d" }
        )
    },

    //login 
    LoginUser: async (req, res) => {
        try {
            const user = await User.findOne({ Email: req.body.Email });
            if (!user) {
                return res.status(404).json("wrong Email!");
            }
            const checkPassword = await bcrypt.compare(
                req.body.Password,
                user.Password
            );
            if (!checkPassword) {
                return res.status(404).json("Wrong Password");
            }
            if (user && checkPassword) {
                const accessToken = UserController.generateAccessToken(user);
                const refreshToken = UserController.generateRefreshToken(user);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })
                const { Password, ...other } = user._doc;
                return res.status(200).json({ ...other, accessToken, refreshToken });
            }
        }
        catch (e) {
            return res.status(500).json(e)
        }
    },

    //get user:
    getallUser: async (req, res) => {
        try {
            const getUser = await User.find();
            res.status(200).json(getUser);
        }
        catch (e) {
            res.status(500).json(e);
        }
    },

    //get a User:
    getAUser: async (req, res) => {
        try {
            const getaUser = await User.findById(req.params.id);
            res.status(200).json(getaUser);

        }
        catch (e) {
            res.status(500).json(e);
        }
    },

    //Update User:
    Change: async (req, res) => {
        try {
            const updatedUser = await User.findById(req.params.id);
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.Password, salt);
            await updatedUser.updateOne({ Password: hashed });
            res.status(200).json("Update successfully!");

        }
        catch (e) {
            res.status(500).json(e);
        }
    },

    UpdateUser: async (req, res) => {
        try {
            const updatedUser = await User.findById(req.params.id);
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.Password, salt);
            await updatedUser.updateOne({ $set: req.body });
            res.status(200).json("Update successfully!");

        }
        catch (e) {
            res.status(500).json(e);
        }
    },

    //Delete User
    DeletedUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Delete Successfully!');
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
};

module.exports = UserController;