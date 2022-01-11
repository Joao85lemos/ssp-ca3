//config app with express
const express = require("express");
const app = express();

//config passport authentication
const passport = require('passport');
require("./config/authentication")(passport)

//config session
const session = require('express-session')
app.use(session({
    secret: "sspca3",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//config flash messages
const flash = require("flash");
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
})

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
const BookController = require("./controllers/BookController");
const OrderController = require("./controllers/OderController");

//config passport authentication
const {authentication} = require('./middlewares/authentication');
app.post("/", function (req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/",
        failureFlash:true
    })(req, res, next)
})

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

app.get("/home", authentication, function (req, res) {
    res.render('home', {user: res.locals.user});
});
//users
app.get("/users", authentication, function (req, res) {
    new UserController().show(req, res);
});

app.get("/users/delete/:id", authentication, function (req, res) {
    console.log(req.params.id);
    new UserController().delete(req, res);
})

app.get("/users/show/:id", authentication, function (req, res) {
    new UserController().show(req, res);
})

app.get("/users/edit/:id", authentication, function (req, res) {
    new UserController().edit(req, res);
});

app.post("/users/edit", authentication, function (req, res) {
    new UserController().update(req, res);
});

//books
app.get("/books", authentication, function (req, res) {
    new BookController().show(req, res);
});

app.get("/books/create", authentication, function (req, res) {
    res.render('./book/create', {book: [{}]});
});

app.post("/books/create", authentication, function (req, res) {
    new BookController().create(req, res);
});

app.get("/books/delete/:id", authentication, function (req, res) {
    new BookController().delete(req, res);
})

app.get("/books/show/:id", authentication, function (req, res) {
    new BookController().show(req, res);
})

app.get("/books/edit/:id", authentication, function (req, res) {
    new BookController().edit(req, res);
});

app.post("/books/edit", authentication, function (req, res) {
    new BookController().update(req, res);
});

//orders
app.get("/orders", authentication, function (req, res) {
    new OrderController().show(req, res);
});

app.get("/orders/create", authentication, function (req, res) {
    res.render('./order/create', {book: [{}]});
});

app.post("/orders/create", authentication, function (req, res) {
    new OrderController().create(req, res);
});

app.get("/orders/delete/:id", authentication, function (req, res) {
    new OrderController().delete(req, res);
})

app.get("/orders/show/:id", authentication, function (req, res) {
    new OrderController().show(req, res);
})

app.get("/orders/edit/:id", authentication, function (req, res) {
    new OrderController().edit(req, res);
});

app.post("/orders/edit", authentication, function (req, res) {
    new OrderController().update(req, res);
});

//start app in a local port
app.listen(8081);
