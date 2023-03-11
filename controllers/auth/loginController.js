import User from "../../models/User.js";
import config from "../../config/config.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({
      email,
      isVerified: true,
      isDeleted: false,
    }).select("name email password _id");

    if (!foundUser) {
      return res.status(404).json({
        status: false,
        message: "User not found!",
        data: "",
      });
    }
    const matchedPassword = await bcrypt.compare(password, foundUser.password);

    if (!matchedPassword) {
      return res.status(406).json({
        status: false,
        message: "Invalid Password",
        data: "",
      });
    }

    const token = Jwt.sign(
      {
        id: foundUser._id,
      },
      config.JWT_ACTIVATE,
      {
        expiresIn: "7d",
      }
    );
    const logInDetails = { ...foundUser._doc };
    delete logInDetails.password;

    return res.status(200).json({
      status: true,
      message: "LoggedIn Successfully!",
      data: {
        token,
        logInDetails,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default loginController;
