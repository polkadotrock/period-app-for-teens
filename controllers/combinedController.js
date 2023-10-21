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
      res.locals.userID = userID; // Use res.locals to make it accessible to all routes
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
    let userID = res.locals.userID;
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
    const userID = res.locals.userID;
    const user = await passage.user.get(userID);
    const appID = passageConfig.appID;

    res.render("profile", { user, appID });
  catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

const update = async (req, res) => {
  try {
    const userID = res.locals.userID;
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
    const userID = res.locals.userID;
    await passage.user.delete(userID);

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

const logController = {
  dashboard: async (req, res) => {
    try {
      res.render('dashboard');
    } catch (err) {
      console.error(err);
      res.redirect('/guest');
    }
  },

  calendar: async (req, res) => {
    try {
      const userID = res.locals.userID; // Access userID from res.locals
      const pastCycles = await Log.find({ user: userID })
        .sort({ year: -1, month: -1 })
        .lean();
      res.render('calendar', { pastCycles });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  },

  logCycle: async (req, res) => {
    try {
      const days = req.body.days.filter(e => e);
      const month = req.body.month;
      const year = req.body.year;
      const userID = res.locals.userID; // Access userID from res.locals

      const log = await Log.create({
        days: days,
        month: month,
        year: year,
        user: userID,
      });

      res.redirect('/calendar');
    } catch (err) {
      console.error(err);
      res.redirect('/dashboard');
    }
  },

  deleteLog: async (req, res) => {
    try {
      const userID = res.locals.userID; // Access userID from res.locals
      await Log.deleteOne({ _id: req.params.id });
      res.redirect('/calendar');
    } catch (err) {
      console.error(err);
      return res.render('calendar');
    }
  },
};

module.exports = {
  passageAuthMiddleware,
  login,
  dashboard,
  logout,
  profile,
  update,
  deleteAccount,
  logController,
};
