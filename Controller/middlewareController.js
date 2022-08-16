const jwt = require("jsonwebtoken");


const middlewareController = {

    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accesstoken = token.split(" ")[1];
            jwt.verify(accesstoken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("token is not valid");
                }
                req.user = user;
                next();
            });
        }
        else {
            return res.status(401).json("You are not authenticated");
        }
    },
    verifyAuthadmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.Admin) {
                next();
            }
            else {
                return res.status(403).json("You're not Allowed to delete other");
            }
        })
    }
}

module.exports = middlewareController;