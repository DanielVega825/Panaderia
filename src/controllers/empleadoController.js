const Empleados = require('../models/empleados')

async function getEmpleado (req, res) {
    const empleados = await Empleados.find().lean().exec()
    res.render('./empleados/empleadosList',{empleados});
}
async function addEmpleado (req, res) {
    
    try {
        
        const {
            nombre,
            apellido,
            documento,
            cargo,
            salarioXhora
        } = req.body
        
        const errors = [];
        const empleado = Empleados({
            nombre,
            apellido,
            documento,
            cargo,
            salarioXhora
        })
        
        if(!nombre) {
            errors.push({text: 'por favor, llene los campos de nombre'});
        }
        if(!apellido) {
            errors.push({text: 'por favor, llene los campos apellido'});
        }
        if(!documento) {
            errors.push({text: 'por favor, llene los campos documento'});
        }
        if(!cargo) {
            errors.push({text: 'por favor, llene los campos cargo'});
        }
        if(!salarioXhora) {
            errors.push({text: 'por favor, llene los campos salario'});
        }

        
        if(errors.length > 0){
           
            console.log(errors.length);
            res.render('empleados/agregarempleados',{
                errors,
                nombre,
                apellido,
                documento,
                cargo,
                salarioXhora
            });
        }else{
            
            

            const productoPanaderia = await empleado.save();
            
            res.redirect('/empleados');
        }

    } catch (e) {
     res.status(500).send({ message: e.message})   
    }
}



module.exports = {
    addEmpleado,
    getEmpleado
};