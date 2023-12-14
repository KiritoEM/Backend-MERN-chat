const { generateToken } = require("./../helper/tokenHelper");
const {
  signupHelper,
  hashPassword,
  checkEmail,
  loginHelper,
} = require("./../helper/AuthHelper");

const signupController = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const emailExists = await checkEmail(email);

  try {
    if (!emailExists) {
      const response = await signupHelper(username, email, hashedPassword);

      if (response) {
        const user = { _id: response._id };
        const token = await generateToken(user);
        console.log("token", token);

        res.status(200).json({ message: "Inscription réussie", token });
      } else {
        res.status(500).json({ message: "Echec de l' inscription" });
      }
    } else {
      res.status(400).json({
        message: "l' utilisateur s'est déja inscris avec cet email",
      });
    }
  } catch (err) {
    console.log("erreur: ", err);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const response = await loginHelper(email, password);

  if (response) {
    const user = { _id: response._id };
    console.log("userId via login: ", user);
    const token = generateToken(user);

    res.status(200).json({ message: "Utilisateur validé ", token });
  } else {
    res.status(500).json({ message: "Des informations non valides" });
  }
};

module.exports = { signupController, loginController };
