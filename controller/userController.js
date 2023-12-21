const { verifyToken } = require("./../helper/tokenHelper");
const { getUserHelper } = require("./../helper/userHelper.js");
const { fectchUserHelper } = require("./../helper/userHelper");

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

const fetchCurrentUser = async (req, res) => {
  try {
    const { token } = req.params;

    if (token) {
      let currentUser = await fectchUserHelper(token);
      if (currentUser) {
        return res.status(200).json(currentUser);
      } else {
        return res
          .status(500)
          .json({ error: "echec de la récupération de l' utilisateur actuel" });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getAllUser, fetchCurrentUser };
