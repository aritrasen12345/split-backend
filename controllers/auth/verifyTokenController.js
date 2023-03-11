import bcrypt from "bcrypt";

import User from "../../models/User.js"

const verifyTokenController = async (req, res, next) => {
    try {
        const {token} = req.body;
        // Finding the user with this token and expiration time;
        const currDate = new Date();
        const foundUser = await User.findOne({uniqueString: token, expirationTime: { $gte: currDate }});
        // If no user is found or token is expired the returning error;
        if(!foundUser) {
            return res.status(404).json({
                status: false,
                message: "Invalid token",
                data: {}
            });
        }
        // If user is found then hashing it's email and matching with token
        const isCorrect = await bcrypt.compare(foundUser.email, token);
        if(isCorrect) {
            foundUser.isVerified = true;
            await foundUser.save();
            return res.status(200).json({
                status: true,
                message: "Email verified successfully.",
                data: {}
            });
        } else {
            return res.status(401).json({
                status: false,
                message: "Email verification failed",
                data: {}
            });
        }
    } catch (err) {
        if(!err.statusCode) 
            err.statusCode = 500;
        next(err);
    }
}

export default verifyTokenController;