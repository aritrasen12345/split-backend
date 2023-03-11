import User from "../../models/User.js";
import config from "../../config/config.js";
import bcryptJs from "bcryptjs";
import Jwt from "jsonwebtoken";

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
      verified: true,
      isDeleted: false,
    });
    if (!user) {
      return res.status(406).json({
        status: false,
        message: "User not found!",
        data: "",
      });
    }
    const matchedPassword = await bcryptJs.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(406).json({
        status: false,
        message: "Invalid Password",
        data: "",
      });
    }

    const token = Jwt.sign(
      {
        id: user._id,
      },
      config.JWT_ACTIVATE,
      {
        expiresIn: "7d",
      }
    );
    const loginDetails = { ...user._doc };
    delete loginDetails.hospitalPassword;
    delete loginDetails.otp;
    delete loginDetails.expTime;

    return res.status(200).json({
      status: true,
      message: "Welcome.....",
      data: {
        token: token,
        loginDetails,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default loginController;
