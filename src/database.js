const mongoose = require('mongoose');

mongoose.connection.on('open', () => console.log('db connected'));


async function connectDb () {
    const uri = 'mongodb://localhost/panaderia';
    await mongoose.connect(uri, {useNewUrlParser: true});
}

module.exports = connectDb;
/*
mongoose.connect('mongodb://localhost/panaderia',{
    useNewUrlParser: true
    
}).then(db => console.log('DB is Connected'))
.catch(err => console.log(err));*/