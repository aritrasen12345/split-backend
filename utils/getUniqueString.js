import bcrypt from "bcrypt";

const getUniqueString = (payload) => {
  return new Promise((resolve, reject) => {
    console.log(payload);
    bcrypt.hash(payload, 10, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
};

export default getUniqueString;
