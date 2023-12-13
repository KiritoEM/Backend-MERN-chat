const jwt = require("jsonwebtoken");
let secretKey = process.env.SECRET_KEY;

const generateToken = (user) => {
  try {
    const { _id } = user;
    const userid = _id;
    const token = jwt.sign({ userId: `${userid}` }, secretKey, {
      expiresIn: "365d",
    });
    console.log("token généré: ", token);

    return token;
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);

    return decoded;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
