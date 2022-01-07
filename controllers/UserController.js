const user = require('../models/User');

class UserController {
    create (req, res) {
        let name = req.body.name;
        let birth_date = req.body.birth_date;
        let email = req.body.email;
        let password = req.body.password;

        let birthDate = new Date(birth_date);
        let age = new Date().getFullYear() - birthDate.getFullYear();

        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        user.create({
            name: name,
            age: age,
            email: email,
            password: hash
        }).then(function (){
            res.redirect('/');
        }).catch(function (error){
            res.send("Error: " + error);
        })
    }

    edit (name, birth_date, email, password) {

    }

    delete (email) {

    }

    show () {

    }
}

module.exports = UserController;