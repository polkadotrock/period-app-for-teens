const express = require("express");
const Passage = require("@passageidentity/passage-node");
const dotenv = require("dotenv");
const router = express.Router();

const Log = require("../models/Log");

dotenv.config({ path: "./config/config.env" });

// Passage configuration
const passageConfig = {
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  // authStrategy: "HEADER",
};

const passage = new Passage(passageConfig); // initialize Passage


// Custom Passage middleware
const passageAuthMiddleware = async (req, res, next) => {
  try {
    let userID = await passage.authenticateRequest(req);
    if (userID) {
      // User is authenticated
      res.userID = userID;
      next();
    }
  } catch(err) {
    console.error(err);
    res.render("unauthorized.ejs"); // render the unauthorized.ejs file if the user is not authenticated
  }
};

// Login route
router.get("/login", async (req, res) => {
  try {
    res.render("login.ejs", { appID: passageConfig.appID });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
  
});

// Authenticated route that uses the Passage middleware
router.get("/dashboard", passageAuthMiddleware, async (req, res) => {
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
    res.render('dashboard-guest');
  }  
});

// Logout route
router.get("/logout", async (req, res) => {
try {
  res.clearCookie("passage-session");
  res.redirect("/");
} catch (err) {
  console.error(err);
    res.redirect('/');
}
});

// Profile route
router.get("/profile", passageAuthMiddleware, async (req, res) => {

  try {
    const userID = res.userID;
    const user = await passage.user.get(userID);
    const appID = passageConfig.appID;

    res.render("profile", { user, appID });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
  
});

// GET /
router.get('/', passageAuthMiddleware, async (req, res) => {
  try {
      res.render('dashboard');
    
  } catch (err) {
    console.error(err);
        res.redirect('/guest');
  }
});

// GET /guest
router.get('/guest', async (req, res) => {
  try {
      res.render('dashboard-guest');
    
  } catch (err) {
    console.error(err);
        res.redirect('/');
  }
});

// GET /learn
router.get('/learn', async (req, res) => {
    try {

        res.render('learn');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// POST /article
router.post('/article', async (req, res) => {
    try {
        res.render('article', { article: req.body.article });
    } catch (err) {
        console.error(err);
        res.redirect('/learn');
    }
});

// GET /article
router.get('/article', async (req, res) => {
    try {
      res.render('article');
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }    
});

// // GET /user
// router.get('/user', passageAuthMiddleware, async (req, res) => {
//     try {
//       res.render('profile');
//     } catch (err) {
//       console.error(err);
//       res.redirect('/');
//     }    
// });

// GET /calendar
router.get('/calendar', passageAuthMiddleware, async (req, res) => {
    try {
      // console.log('req body from dashboard ', req.res.userID);

      const pastCycles = await Log.find({ user: res.userID })
        .sort({year: -1, month: -1})
        .lean();
      // console.log(pastCycles);
      res.render('calendar', { pastCycles });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
});

// POST /logcycle
router.post('/logcycle', passageAuthMiddleware, async (req, res) => {
    try {
      // console.log('req.res.userID ', req.res.userID);
      // console.log('req.body: ', req.body);
      const days = req.body.days.filter(e => e);
      const month = req.body.month;
      const monthabbr = req.body.monthabbr;
      const year = req.body.year;
      // console.log('days', days);
      // console.log(month);
      // console.log(year);

      const log = await Log.create({
        days: days,
        month: month,
        monthabbr: monthabbr,
        year: year,
        user: req.res.userID,
      });
      res.redirect('/calendar');
    } catch (err) {
      console.error(err);
      res.redirect('/dashboard');
    }
});

// DELETE /:id
router.delete('/:id',passageAuthMiddleware, async (req, res) => {
  try {
    await Log.deleteOne({ _id: req.params.id });
      res.redirect('/calendar');
  } catch (err) {
    console.error(err);
    return res.render('calendar');
  }
});

module.exports = router;
