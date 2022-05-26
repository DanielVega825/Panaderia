const express = require('express');
const upload = require('../libs/storage')
const router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const {getProducts, addProduct} = require('../controllers/productController');
const Producto = require('../models/producto')

router.get('/notes', isAuthenticated, getProducts);

router.get('/notes/agregarProductos', isAuthenticated, (req,res) => {
    res.render('./notes/agregarProducto');
});

router.get('/notes/edit/:id', isAuthenticated, async(req,res) => {
    const producto = await Producto.findById(req.params.id);
    res.render('notes/editProducto',{producto});
});

router.put('/notes/edit-producto/:id', isAuthenticated, async(req,res) => {
    const {name,size,unitaryPrice,description} = req.body;
    const productosPanaderia = await Producto.findByIdAndUpdate(req.params.id,{name,size,unitaryPrice,description});
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async(req,res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
});

router.post('/notes/agregarProductos', isAuthenticated,upload.single('file'), addProduct)




module.exports = router;