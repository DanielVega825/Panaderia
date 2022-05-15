const express = require('express');

const router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const Producto = require('../models/producto');

router.get('/notes', isAuthenticated, async (req,res) => {
    const productos = await Producto.find();
    res.render('./notes/new-note',{productos});
});

router.get('/notes/agregarProductos', isAuthenticated, (req,res) => {
    res.render('./notes/agregarProducto');
});

router.get('/notes/edit/:id', isAuthenticated, async(req,res) => {
    const producto = await Producto.findById(req.params.id);
    res.render('notes/editProducto',{producto});
});

router.put('/notes/edit-producto/:id', isAuthenticated, async(req,res) => {
    const {producto,categoria,ubicacion,precio} = req.body;
    await Producto.findByIdAndUpdate(req.params.id,{producto,categoria,ubicacion,precio});
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async(req,res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
});

router.post('/notes/agregarProductos', isAuthenticated, async (req,res) => {
    const {producto,categoria,ubicacion,precio} =req.body;
    const errors = [];
    if(!producto) {
        errors.push({text: 'por favor, llene los campos'});
    }
    if(!categoria) {
        errors.push({text: 'por favor, llene los campos Categoria'});
    }
    if(!ubicacion) {
        errors.push({text: 'por favor, llene los campos ubicacion'});
    }
    if(!precio) {
        errors.push({text: 'por favor, llene los campos precio'});
    }
    
    if(errors.length > 0){
        console.log(errors.length);
        res.render('notes/agregarProducto',{
            errors,
            producto,
            categoria,
            ubicacion,
            precio
        });
    }else{
        const newProducto = new Producto({producto,categoria,ubicacion,precio});
        await newProducto.save();
        res.redirect('/notes');
    }

});




module.exports = router;