const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_ATLAS_URI);

    console.log("connexion successfully with MongoDB ...");
  } catch (err) {
    console.log(err);
    console.log("connexion failed ith Database");
    process.exit();
  }
};

module.exports = ConnectDB;
