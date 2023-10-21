const Passage = require("@passageidentity/passage-node");
const Log = require("../models/Log");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const passageConfig = {
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
};

const passage = new Passage(passageConfig);

const passageAuthMiddleware = async (req, res, next) => {
  try {
    let userID = await passage.authenticateRequest(req);
    if (userID) {
      res.userID = userID;
      next();
    }
  } catch (err) {
    console.error(err);
    res.render("unauthorized.ejs");
  }
};

const login = async (req, res) => {
  try {
    res.render("login.ejs", { appID: passageConfig.appID });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

const dashboard = async (req, res) => {
  try {
    let userID = res.userID;
    let user = await passage.user.get(userID);

    let userIdentifier;
    if (user.email) {
      userIdentifier = user.email;
    } else if (user.phone) {
      userIdentifier = user.phone;
    }

    res.render("dashboard.ejs", { userIdentifier });
  } catch (err) {
    console.error(err);
    res.render("dashboard-guest");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("passage-session");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

const profile = async (req, res) => {
  try {
    const userID = res.userID;
    const user = await passage.user.get(userID);
    const appID = passageConfig.appID;

    res.render("profile", { user, appID });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

const update = async (req, res) => {
  try {
    const userID = res.userID;
    const user = await passage.user.get(userID);

    const { name, email, phone } = req.body;

    await passage.user.update(userID, {
      name,
      email,
      phone,
    });

    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userID = res.userID;
    await passage.user.delete(userID);

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

module.exports = {
  passageAuthMiddleware,
  login,
  dashboard,
  logout,
  profile,
  update,
  deleteAccount,
};
