const { verifyToken } = require("./../helper/tokenHelper");
const { getUserHelper } = require("./../helper/userHelper.js");

const getAllUser = async (req, res) => {
  try {
    const { token } = req.params;
    let decodedToken = verifyToken(token);
    if (decodedToken.userId) {
      userID = decodedToken.userId;
    }
    const response = await getUserHelper(userID);

    if (response) {
      return res.status(200).json(response);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUser };
