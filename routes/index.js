const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const logController = require("../controllers/logController");

// Login route
router.get("/login", (req, res) => {
  try {
    authController.login(req, res);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Dashboard route
router.get("/dashboard", authController.passageAuthMiddleware, (req, res) => {
  try {
    authController.dashboard(req, res);
  } catch (err) {
    console.error(err);
    res.render('unauthorized.ejs');
  }
});

// Logout route
router.get("/logout", (req, res) => {
  try {
    authController.logout(req, res);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Profile route
router.get("/profile", authController.passageAuthMiddleware, (req, res) => {
  try {
    authController.profile(req, res);
  } catch (err) {
    console.error(err);
    res.render('unauthorized.ejs');
  }
});

// Update profile route
router.post("/profile", authController.passageAuthMiddleware, (req, res) => {
  try {
    authController.update(req, res);
  } catch (err) {
    console.error(err);
    res.render('unauthorized.ejs');
  }
});

// Delete account route
router.post("/delete-account", authController.passageAuthMiddleware, (req, res) => {
  try {
    authController.deleteAccount(req, res);
  } catch (err) {
    console.error(err);
    res.render('unauthorized.ejs');
  }
});

// Guest route
router.get('/guest', (req, res) => {
  try {
    res.render('dashboard-guest');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Learn route
router.get('/learn', (req, res) => {
  try {
    res.render('learn');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Article route with try-catch
router.post('/article', (req, res) => {
  try {
    res.render('article', { article: req.body.article });
  } catch (err) {
    console.error(err);
    res.redirect('/learn');
  }
});

// Article GET route
router.get('/article', (req, res) => {
  try {
    res.render('article');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Dashboard route
router.get("/dashboard-logs", (req, res) => {
  try {
    logController.dashboard(req, res);
  } catch (err) {
    console.error(err);
    res.redirect('/guest');
  }
});

// Calendar route
router.get("/calendar", authController.passageAuthMiddleware, (req, res) => {
  try {
    logController.calendar(req, res);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Log Cycle route
router.post("/logcycle", authController.passageAuthMiddleware, (req, res) => {
  try {
    logController.logCycle(req, res);
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
});

// Delete Log route
router.delete("/:id", authController.passageAuthMiddleware, (req, res) => {
  try {
    logController.deleteLog(req, res);
  } catch (err) {
    console.error(err);
    res.render('calendar');
  }
});

module.exports = router;
