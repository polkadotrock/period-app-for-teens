const express = require('express');
const router = express.Router();

// desc     dashboard
// route    GET / 
router.get('/', (req, res) => {
    res.render('dashboard');
});

// desc     learn
// route    GET /learn
router.get('/learn', (req, res) => {
    res.render('learn');
});

// desc     article
// route    POST /article
router.post('/article', async (req, res) => {
    try {
        res.render('article', { article: req.body.article });
    } catch (err) {
        console.error(err);
        res.redirect('/learn');
    }

});

// desc     article
// route    GET /article
router.get('/article', (req, res) => {
    res.render('article');
});

module.exports = router;