import User from "../../models/User.js";
import sendMail from "../../utils/sendEmail.js";
import getUniqueString from "../../utils/getUniqueString.js";
import getForgetPasswordEmailText from "../../utils/getForgetPasswordEmailText.js";

const forgetPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({
        status: false,
        message: "User not found!",
        data: [],
      });
    }
    // Create a unique string and
    const newUniqueString = await getUniqueString(foundUser.email);
    const currData = new Date();
    const expirationTime = new Date(currData.getTime() + 30 * 60000);
    foundUser.uniqueString = newUniqueString;
    foundUser.expirationTime = expirationTime;

    await foundUser.save();

    // Get Forget Password URL Email Template
    const text = getForgetPasswordEmailText(foundUser.name, newUniqueString);

    const isSend = await sendMail(foundUser.email, "Forget Password", text);

    if (!isSend) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong, could not send mail",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Please check your email",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

export default forgetPasswordController;
