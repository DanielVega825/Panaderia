const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const bodyParser = require('body-parser')
const productRoutes = require('./routes/notes')

//Inicializaciones
const app = express();
const db = require('./database');

async function initDb () {
    await db()
}

initDb()

require('./config/passport');

//configuraciones
app.set('port', process.env.PORT|| 3000);

 
app.set("views", path.join(__dirname, "views"));


app.engine('.hbs', exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    runtimeOptions: {                           
        allowProtoPropertiesByDefault: true,
        // allowProtoMethodsByDefault: true
    },
    extname: '.hbs',
}));



app.set('view engine', '.hbs');
// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global Variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

// Routes
app.use(require('./routes/index'));
app.use(productRoutes)
app.use(require('./routes/users'));
app.use(require('./routes/empleadosRoutes'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('users',(req,res) => {
    res.render('signup');
});

// Static Files
app.use(express.static(path.join(__dirname,'public')));
app.use('/public', express.static(`${__dirname}/storage/img`))



// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
});