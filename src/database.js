const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/panaderia',{
    useNewUrlParser: true
    
}).then(db => console.log('DB is Connected'))
.catch(err => console.log(err));