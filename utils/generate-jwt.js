const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    const { name, lastname, _id, profileImage, role } = user;
    const payload = { id: _id, name, lastname, profileImage, role };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          reject("Error. Token not generated.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generateJWT;
