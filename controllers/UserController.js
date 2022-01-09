const user = require('../models/User');
const bcrypt = require("bcryptjs");

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
        });
    }

    edit (req, res) {
        let user_id = req.params.id;

        const findUser = user.findOne({
            where: {id: user_id},
            attributes: ['id', 'name', 'age', 'email']
        }).then(function (rawUser){
            let users = [];
            users.push(rawUser.dataValues);
            if (findUser === null) {
                res.send("Not found!");
            } else {
                const object = {
                    mapUser: users.map(data => {
                        return {
                            id: data.id,
                            name: data.name,
                            age: data.age,
                            email: data.email,
                        }
                    })
                }
                res.render('form-register', {user: object.mapUser});
            }
        });
    }

    update (req, res) {
        let id = req.body.id;
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        user.update({
            name: name,
            email: email,
            password: hash
        }, {where: {id: id},}).then(function (){
            res.redirect('/home');
        }).catch(function (error){
            res.send("Error: " + error);
        });
    }

    delete (req, res) {
        let user_id = req.params.id;

        user.destroy({ where: { id: user_id } }).then(function (){
            res.redirect('/users');
        }).catch(function (error){
            res.send("Error: " + error);
        });
    }

    show (req, res) {
        let user_id = req.params.id;

        if (user_id) {
            const findUser = user.findOne({
                where: {id: user_id},
                attributes: ['id', 'name', 'age', 'email', 'admin', 'createdAt']
            }).then(function (rawUser){
                let users = [];
                users.push(rawUser.dataValues);
                if (findUser === null) {
                    res.send("Not found!");
                } else {
                    const object = {
                        mapUser: users.map(data => {
                            return {
                                id: data.id,
                                name: data.name,
                                age: data.age,
                                email: data.email,
                                admin: data.admin,
                                createdAt: data.createdAt
                            }
                        })
                    }
                    res.render('./user/show', {user: object.mapUser});
                }
            });
        } else {
            user.findAll({
                attributes: ['id', 'name', 'age', 'email']
            }).then(function (rawUsers){
                const object = {
                    users: rawUsers.map(data => {
                        return {
                            id: data.id,
                            name: data.name,
                            age: data.age,
                            email: data.email
                        }
                    })
                }
                res.render('./user/list', {users: object.users});
            }).catch(function (error){
                res.send("Error: " + error);
            });
        }
    }
}

module.exports = UserController;