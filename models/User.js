const db = require('../database/database');

const User = db.sequelize.define('users', {
    name: {
        type: db.Sequelize.STRING
    },
    age: {
        type: db.Sequelize.INTEGER
    },
    email: {
        type: db.Sequelize.STRING,
        unique: true
    },
    password: {
        type: db.Sequelize.STRING
    },
    admin: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: false
    }
})



module.exports = User;

//User.sync({force: true});