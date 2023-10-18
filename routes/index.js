const express = require('express');
const Passage = require("@passageidentity/passage-node");
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config({ path: './config/config.env' });

// Passage configuration
const passageConfig = {
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
};

const passage = new Passage(passageConfig); // initialize Passage

// Custom Passage middleware
const passageAuthMiddleware = async (req, res, next) => {
  try {
    let userID = await passage.authenticateRequest(req);
    if (userID) { // User is authenticated
      res.userID = userID;
      next(); 
    }
  } catch (e) {
    console.log(e);
    res.render("unauthorized.ejs"); // render the unauthorized.ejs file if the user is not authenticated
  }
};

// Login route
router.get("/login", (req, res) => {
  res.render("login.ejs", { appID: passageConfig.appID });
});

// Authenticated route that uses the Passage middleware
router.get("/dashboard", passageAuthMiddleware, async (req, res) => {
  let userID = res.userID;
  let user = await passage.user.get(userID);

  console.log(user);

  let userIdentifier;
  if (user.email) {
    userIdentifier = user.email;
  } else if (user.phone) {
    userIdentifier = user.phone;
  }

  res.render("dashboard.ejs", { userIdentifier });
});

module.exports = router;
