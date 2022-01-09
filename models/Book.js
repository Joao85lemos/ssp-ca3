const db = require('../database/database');

const Book = db.sequelize.define('books', {
    tittle: {
        type: db.Sequelize.STRING
    },
    author: {
        type: db.Sequelize.STRING
    },
    edition: {
        type: db.Sequelize.INTEGER,
    },
    genre: {
        type: db.Sequelize.STRING
    },
    publisher: {
        type: db.Sequelize.STRING,
    },
    language: {
        type: db.Sequelize.STRING,
    },
    price: {
        type: db.Sequelize.DOUBLE
    },
    quantity: {
        type: db.Sequelize.INTEGER,
    }
})



module.exports = Book;

//Book.sync({force: true});