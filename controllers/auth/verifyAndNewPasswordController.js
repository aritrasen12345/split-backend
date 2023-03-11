import bcrypt from "bcrypt";

import User from "../../models/User.js";

const verifyAndNewPasswordController = async (req, res, next) => {
  try {
    const { newPassword, token } = req.body;
    // Finding the user with this token and expiration time;
    const currDate = new Date();
    const foundUser = await User.findOne({
      uniqueString: token,
      expirationTime: { $gte: currDate },
    });
    // If no user is found or token is expired the returning error;
    if (!foundUser) {
      return res.status(404).json({
        status: false,
        message: "Invalid Token",
        data: {},
      });
    }
    // If User is found then hashing it's email and matching with token
    const isCorrect = await bcrypt.compare(foundUser.email, token);
    if (!isCorrect) {
      return res.status(401).json({
        status: false,
        message: "Verification failed!",
        data: [],
      });
    }
    // Hashed newPassword
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    foundUser.password = hashedPassword;
    await foundUser.save();

    return res.status(200).json({
      status: true,
      message: "Password Changed Successfully!",
      data: [],
    });
  } catch (err) {
    next(err);
  }
};

export default verifyAndNewPasswordController;
