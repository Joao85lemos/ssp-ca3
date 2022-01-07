const Sequelize = require('sequelize');
const sequelize = new Sequelize('ssp_ca3', 'root', 'root', {
    host: "localhost",
    dialect: 'mysql'
});

//models
const User = sequelize.define('users', {
    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

User.sync({force: true});