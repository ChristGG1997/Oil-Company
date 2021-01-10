const express = require('express');
const router = express.Router();
require('./home');
require('./admin')

router.get('/', (req, res) => {
    res.redirect('/signin');
});

router.get('/add1', (req, res) => {
    res.render('home/add1')
});

router.get('/list', (req, res) => {
    res.render('home/list')
});


module.exports = router;