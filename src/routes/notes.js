const express = require('express');

const router = express.Router();
const {isAuthenticated} = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req,res) => {
    res.render('./notes/new-note');
});

router.get('/notes/agregarProductos', isAuthenticated, (req,res) => {
    res.render('./notes/agregarProducto');
});

router.get('/notes', isAuthenticated, (req,res) => {
    res.render('./notes/new-note');
});


module.exports = router;