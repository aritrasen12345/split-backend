import User from "../../models/User.js";
import config from "../../config/config.js";
import genOtp from "../../utils/genOtp.js";
import { sendMail } from "../../utils/sendEmail.js";

const forgetPasswordController = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(406).json({
        status: false,
        message: "User not found!",
        data: [],
      });
    }
    const forgetPasswordOtp = genOtp();
    const currDate = new Date();
    const expTime = new Date(currDate.getTime() + 30 * 60000);

    user.otp = forgetPasswordOtp;
    user.expTime = expTime;
    await user.save();

    const mail = sendMail(
      user.email,
      "Forget Password",
      `Your OTP Pin is ${forgetPasswordOtp}, It is valid till one hour`
    );

    if (!mail) {
      return res.status(500).json({
        status: true,
        message: "Something went wrong ,could not send mail",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Please verify your email",
      data: { id: user._id },
    });
  } catch (err) {
    next(err);
  }
};

export default forgetPasswordController;
