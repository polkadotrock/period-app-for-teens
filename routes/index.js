const express = require('express');
const router = express.Router();

// desc     dashboard
// route    GET / 
router.get('/', (req, res) => {
    res.render('dashboard');
});

//------ TEST YOUR EJS FILE HERE ------//

// replace '/test' and 'test' with the name of your file for testing purposes

router.get('/test', (req, res) => {
    res.render('test');
});

module.exports = router;