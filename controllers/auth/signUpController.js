import bcrypt from "bcrypt";

import User from "../../models/User.js";
import getSignUpEmailText from "../../utils/getSignUpEmailText.js";
import getUniqueString from "../../utils/getUniqueString.js";
import sendEmail from "../../utils/sendEmail.js";

const signUpController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Checking whether an user with same email already exists or not
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({
        status: false,
        message: "User with same email already exists!",
        data: {},
      });
    }
    // If this is email is not registered already
    const hash = await bcrypt.hash(password, 12);
    const uniqueString = await getUniqueString(email);
    const currDate = new Date();
    const expirationTime = new Date(currDate.getTime() + 30 * 60000);
    const newUser = new User({
      name,
      email,
      password: hash,
      uniqueString,
      expirationTime,
    });
    await newUser.save();
    // As the user is saved send an email to the user's mail with the verification link
    const text = getSignUpEmailText(name, uniqueString);
    const isSend = await sendEmail(email, "Email verification : Split Expense", text);
    if (isSend) {
      return res.status(201).json({
        status: true,
        message: "Please check your email for verification link.",
        data: {},
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Can not send email!",
        data: {},
      });
    }
  } catch (err) {
    next(err);
  }
};

export default signUpController;
