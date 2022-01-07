//config app with express
const express = require("express");
const app = express();

//config template engine
const handlebars = require('express-handlebars');
var hbs = handlebars.create({
    helpers: {
    },
    defaultLayout: 'main',
    partialsDir: ['views/partials/']
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//config body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// config controllers
const UserController = require("./controllers/UserController");


//config routes
app.get("/", function (req, res) {
    res.render('form-login');
});

app.get("/register", function (req, res) {
    res.render('form-register');
})
app.post("/register", function (req, res) {
    new UserController().create(req, res);
})

//start app in a local port
app.listen(8081);
