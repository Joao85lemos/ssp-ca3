const book = require('../models/Book');

class BookController {
    create (req, res) {
        let tittle = req.body.tittle;
        let author = req.body.author;
        let description = req.body.description;
        let edition = req.body.edition;
        let genre = req.body.genre;
        let publisher = req.body.publisher;
        let language = req.body.language;
        let price = req.body.price;
        let quantity = req.body.quantity;

        book.create({
            tittle: tittle,
            author: author,
            description: description,
            edition: edition,
            genre: genre,
            publisher: publisher,
            language: language,
            price: price,
            quantity: quantity
        }).then(function (){
            res.redirect('/home');
        }).catch(function (error){
            res.send("Error: " + error);
        });
    }

    edit (req, res) {
        let book_id = req.params.id;

        const findBook = book.findOne({
            where: {id: book_id},
            attributes: ['id', 'tittle', 'author', 'description', 'edition', 'genre', 'publisher', 'language', 'price', 'quantity']
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
                            author: data.author,
                            description: data.description,
                            edition: data.edition,
                            genre: data.genre,
                            publisher: data.publisher,
                            language: data.language,
                            price: data.price,
                            quantity: data.quantity
                        }
                    })
                }
                res.render('./book/create', {book: object.mapBook});
            }
        });
    }

    update (req, res) {
        let id = req.body.id;
        let tittle = req.body.tittle;
        let author = req.body.author;
        let description = req.body.description;
        let edition = req.body.edition;
        let genre = req.body.genre;
        let publisher = req.body.publisher;
        let language = req.body.language;
        let price = req.body.price;
        let quantity = req.body.quantity;

        book.update({
            tittle: tittle,
            author: author,
            description: description,
            edition: edition,
            genre: genre,
            publisher: publisher,
            language: language,
            price: price,
            quantity: quantity
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
                attributes: ['id', 'tittle', 'author', 'description', 'edition', 'genre', 'publisher', 'language', 'price', 'quantity']
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
                                author: data.author,
                                description: data.description,
                                edition: data.edition,
                                genre: data.genre,
                                publisher: data.publisher,
                                language: data.language,
                                price: data.price,
                                quantity: data.quantity
                            }
                        })
                    }
                    res.render('./book/show', {book: object.mapBook});
                }
            });
        } else {
            book.findAll({
                attributes: ['id', 'tittle', 'description', 'author', 'edition', 'genre', 'publisher', 'language', 'price', 'quantity']
            }).then(function (rawBooks){
                const object = {
                    books: rawBooks.map(data => {
                        return {
                            id: data.id,
                            tittle: data.tittle,
                            author: data.author,
                            description: data.description,
                            edition: data.edition,
                            genre: data.genre,
                            publisher: data.publisher,
                            language: data.language,
                            price: data.price,
                            quantity: data.quantity
                        }
                    })
                }
                res.render('./book/list', {books: object.books});
            }).catch(function (error){
                res.send("Error: " + error);
            });
        }
    }
}

module.exports = BookController;