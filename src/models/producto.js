const mongoose = require('mongoose');

const {Schema} = mongoose;
const ProductoSchema = new Schema({
    producto: {type: String, required:true},
    categoria: {type: String, required:true},
    ubicacion: {type: String, required:true},
    precio: {type: String, required:true},
    date: {type: Date, default: Date.now}
}); 

module.exports = mongoose.model('Producto',ProductoSchema);