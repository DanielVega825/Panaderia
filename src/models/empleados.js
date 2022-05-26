const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmpleadoSchema = Schema({
    idE: Number,
    nombre: String,
    apellido: String,
    documento: Number,
    cargo: String,
    salarioXhora: Number
},{
    timestamps: true
});


module.exports = mongoose.model('empleados', EmpleadoSchema);