const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const {addEmpleado,getEmpleado} = require('../controllers/empleadoController');
const Empleados = require('../models/empleados');


router.get('/empleados', isAuthenticated, getEmpleado)


router.get('/empleados/agregarempleados', isAuthenticated, (req,res) => {
    res.render('./empleados/agregarEmpleado');
});

router.get('/empleados/edit/:id', isAuthenticated, async(req,res) => {
    const empleados = await Empleados.findById(req.params.id);
    res.render('empleados/editEmpleados',{empleados});
});

router.put('/empleados/edit-empleado/:id', isAuthenticated, async(req,res) => {
    const {nombre,apellido,documento,cargo,salarioXhora} = req.body;
    const empleados = await Empleados.findByIdAndUpdate(req.params.id,{nombre,apellido,documento,cargo,salarioXhora});
    res.redirect('/empleados');
});

router.delete('/empleados/delete/:id', isAuthenticated, async(req,res) => {
    await Empleados.findByIdAndDelete(req.params.id);
    res.redirect('/empleados');
});

router.post('/empleados/agregarempleados', isAuthenticated, addEmpleado)


module.exports = router;
