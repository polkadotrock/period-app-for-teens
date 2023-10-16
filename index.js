const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const Passage = require("@passageidentity/passage-node");
const cors = require("cors");
// const { router } = require('./routes/index.js');

const app = express();

// we use cors to allow our frontend to make requests to our backend from any origin
app.use(cors());

// load config !important from the .env file in the root directory
dotenv.config();

// export port
const PORT = process.env.PORT || 3000;

console.log(process.env.PORT);

app.set('view engine', 'ejs');

// bodyparser to extra data from forms
app.use(express.urlencoded({ extended: false }));

// use public folder
app.use(express.static('public'));

// user morgan to log requests
app.use(morgan('dev'));

app.get("/", (req, res) => {
    res.render("dashboard.ejs", { appID: process.env.PASSAGE_APP_ID });
  });

// Passage config
const passageConfig = {
    appID: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
  };

console.log(passageConfig);

// initialize Passage
app.get("/login", (req, res) => {
    res.render("login.ejs", { appID: passageConfig.appID });
});

// custom Passage middleware
const passage = new Passage(passageConfig);
const passageAuthMiddleware = (() => {
    return async (req, res, next) => {
        try {
            let userID = await passage.authenticateRequest(req);
            if (userID) {
              // user is authenticated
              res.userID = userID;
              next();
            }
          } catch (e) {
            console.log(e);
            res.render("unauthorized.ejs");
          }
        };
      })();
      
      // authenticated route that uses middleware
      app.get("/dashboard", passageAuthMiddleware, async (req, res) => {
        let userID = res.userID;
        let user = await passage.user.get(userID);

        console.log(userID);
        console.log(user);
      
        let userIdentifier;
        if (user.email) {
          userIdentifier = user.email;
        } else if (user.phone) {
          userIdentifier = user.phone;
        }
      
        res.render("dashboard.ejs", { userIdentifier });
      });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));