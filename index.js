//config app with express
const express = require("express");
const app = express();

//config template engine
const handlebars = require('express-handlebars');
const path = require ('path');
app.use(express.static(path.join(__dirname + 'views')));
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
    res.render('form-register', {user: [{}]});
});

app.post("/register", function (req, res) {
    new UserController().create(req, res);
});

app.get("/home", function (req, res) {
    res.render('home');
});

app.get("/users", function (req, res) {
    new UserController().show(req, res);
});

app.get("/users/delete/:id", function (req, res) {
    new UserController().delete(req, res);
})

app.get("/users/show/:id", function (req, res) {
    new UserController().show(req, res);
})

app.get("/users/edit/:id", function (req, res) {
    new UserController().edit(req, res);
});

app.post("/users/edit", function (req, res) {
    new UserController().update(req, res);
});

//start app in a local port
app.listen(8081);
