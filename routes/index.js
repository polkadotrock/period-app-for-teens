const express = require("express");
const router = express.Router();

// desc     dashboard
// route    GET /
router.get("/", (req, res) => {
  res.render("dashboard");
});

// desc     learn
// route    GET /learn
router.get('/learn', (req, res) => {
    res.render('learn');
});

module.exports = router;
