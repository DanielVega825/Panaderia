const express = require('express');
const Product = require('../models/producto')
const router = express.Router();

router.get('/', async(req, res) => {
    const products = await Product.find().lean().exec()
    res.render('index',{products});
});
router.get('/about', (req, res) => {
    res.render('about');
});


module.exports = router;