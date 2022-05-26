const Product = require('../models/producto')

async function addProduct (req, res) {
    
    try {
        
        const {
            name,
            size,
            unitaryPrice,
            description
        } = req.body
        
        
        const errors = [];
        const product = Product({
            name,
            size,
            unitaryPrice,
            description
        })
        
        if(!name) {
            errors.push({text: 'por favor, llene los campos'});
        }
        if(!size) {
            errors.push({text: 'por favor, llene los campos Categoria'});
        }
        if(!unitaryPrice) {
            errors.push({text: 'por favor, llene los campos ubicacion'});
        }
        if(!description) {
            errors.push({text: 'por favor, llene los campos precio'});
        }
        
        if(errors.length > 0){
            
            console.log(errors.length);
            res.render('notes/agregarProducto',{
                errors,
                name,
                size,
                unitaryPrice,
                description
            });
        }else{
            
            
            

            const productoPanaderia = await product.save();
            
            res.redirect('/notes');
        }

    } catch (e) {
     res.status(500).send({ message: e.message})   
    }
}

async function getProducts (req, res) {
    const products = await Product.find().lean().exec()
    res.render('./notes/new-note',{products});
}

module.exports = {
    addProduct,
    getProducts
}