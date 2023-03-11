import bcrypt from "bcrypt";

const getUniqueString = (payload) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(payload, 12, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
};

export default getUniqueString;
