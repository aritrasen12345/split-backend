import bcrypt from "bcrypt";

import User from "../../models/User.js";

const signUpController = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };
  } catch (err) {
    next(err);
  }
};

export default signUpController;
