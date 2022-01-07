const express = require("express");
const app = express();
const handlebars = require('express-handlebars');

//config template engine

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(8081);
