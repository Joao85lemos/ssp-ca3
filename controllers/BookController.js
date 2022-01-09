const book = require('../models/Book');

class BookController {
    create (req, res) {
        let tittle = req.body.tittle;
        let author = req.body.author;
        let edition = req.body.edition;
        let genre = req.body.genre;
        let publisher = req.body.publisher;
        let language = req.body.language;
        let price = req.body.price;
        let quantity = req.body.quantity;

        book.create({
            tittle: tittle,
            author: author,
            edition: edition,
            genre: genre,
            publisher: publisher,
            language: language,
            price: price,
            quantity: quantity
        }).then(function (){
            res.redirect('/');
        }).catch(function (error){
            res.send("Error: " + error);
        });
    }

    edit (req, res) {
        let book_id = req.params.id;

        const findBook = book.findOne({
            where: {id: book_id},
            attributes: ['id', 'tittle', 'age', 'edition']
        }).then(function (rawBook){
            let books = [];
            books.push(rawBook.dataValues);
            if (findBook === null) {
                res.send("Not found!");
            } else {
                const object = {
                    mapBook: books.map(data => {
                        return {
                            id: data.id,
                            tittle: data.tittle,
                            age: data.age,
                            edition: data.edition,
                        }
                    })
                }
                res.render('form-register', {book: object.mapBook});
            }
        });
    }

    update (req, res) {
        let id = req.body.id;
        let tittle = req.body.tittle;
        let edition = req.body.edition;
        let genre = req.body.genre;

        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(genre, salt);

        book.update({
            tittle: tittle,
            edition: edition,
            genre: hash
        }, {where: {id: id},}).then(function (){
            res.redirect('/home');
        }).catch(function (error){
            res.send("Error: " + error);
        });
    }

    delete (req, res) {
        let book_id = req.params.id;

        book.destroy({ where: { id: book_id } }).then(function (){
            res.redirect('/books');
        }).catch(function (error){
            res.send("Error: " + error);
        });
    }

    show (req, res) {
        let book_id = req.params.id;

        if (book_id) {
            const findBook = book.findOne({
                where: {id: book_id},
                attributes: ['id', 'tittle', 'age', 'edition', 'admin', 'createdAt']
            }).then(function (rawBook){
                let books = [];
                books.push(rawBook.dataValues);
                if (findBook === null) {
                    res.send("Not found!");
                } else {
                    const object = {
                        mapBook: books.map(data => {
                            return {
                                id: data.id,
                                tittle: data.tittle,
                                age: data.age,
                                edition: data.edition,
                                admin: data.admin,
                                createdAt: data.createdAt
                            }
                        })
                    }
                    res.render('show-book', {book: object.mapBook});
                }
            });
        } else {
            book.findAll({
                attributes: ['id', 'tittle', 'age', 'edition']
            }).then(function (rawBooks){
                const object = {
                    books: rawBooks.map(data => {
                        return {
                            id: data.id,
                            tittle: data.tittle,
                            age: data.age,
                            edition: data.edition
                        }
                    })
                }
                res.render('list-books', {books: object.books});
            }).catch(function (error){
                res.send("Error: " + error);
            });
        }
    }
}

module.exports = BookController;