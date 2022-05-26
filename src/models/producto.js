/*const mongoose = require('mongoose');

const {Schema} = mongoose;
const ProductoSchema = new Schema({
    producto: {type: String, required:true},
    categoria: {type: String, required:true},
    ubicacion: {type: String, required:true},
    precio: {type: String, required:true},
    date: {type: Date, default: Date.now}
}); 

ProductoSchema.method.setImgUrl = function setImgUrl () {
    
}

module.exports = mongoose.model('productos',ProductoSchema);*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: String,
    size: Number,
    unitaryPrice: Number,
    imgUrl: String,
    description: String
},{
    timestamps: true
});

ProductSchema.methods.setImgUrl = function setImgUrl (filename) {
     
    this.imgUrl = `http://localhost:3000/public/${filename}`
}

module.exports = mongoose.model('products', ProductSchema);