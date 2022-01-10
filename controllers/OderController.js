const db = require('../database/database');
const Order = require("../models/order");

const order = Order(db.sequelize, db.Sequelize);

class OrderController {
    create (req, res) {
        let order_date = req.body.order_date;
        let amount = req.body.amount;
        let userId = req.body.userId;
        let bookId = req.body.bookId;

        order.create({
            order_date: order_date,
            amount: amount,
            userId: userId,
            bookId: bookId,
        }).then(function (){
            res.redirect('/home');
        }).catch(function (error){
            res.send("Error: " + error);
        });
    }

    edit (req, res) {
        let order_id = req.params.id;

        const findOrder = order.findOne({
            where: {id: order_id},
            attributes: ['id', 'order_date', 'amount', 'userId', 'bookId']
        }).then(function (rawOrder){
            let orders = [];
            orders.push(rawOrder.dataValues);
            if (findOrder === null) {
                res.send("Not found!");
            } else {
                const object = {
                    mapOrder: orders.map(data => {
                        return {
                            id: data.id,
                            order_date: data.order_date,
                            amount: data.amount,
                            userId: data.userId,
                            bookId: data.bookId,
                        }
                    })
                }
                res.render('./order/create', {order: object.mapOrder});
            }
        });
    }

    update (req, res) {
        let id = req.body.id;
        let order_date = req.body.order_date;
        let amount = req.body.amount;
        let userId = req.body.userId;
        let bookId = req.body.bookId;

        order.update({
            order_date: order_date,
            amount: amount,
            userId: userId,
            bookId: bookId,
        }, {where: {id: id},}).then(function (){
            res.redirect('/home');
        }).catch(function (error){
            res.send("Error: " + error);
        });
    }

    delete (req, res) {
        let order_id = req.params.id;

        order.destroy({ where: { id: order_id } }).then(function (){
            res.redirect('/orders');
        }).catch(function (error){
            res.send("Error: " + error);
        });
    }

    show (req, res) {
        let order_id = req.params.id;

        if (order_id) {
            const findOrder = order.findOne({
                where: {id: order_id},
                attributes: ['id', 'order_date', 'amount', 'userId', 'bookId']
            }).then(function (rawOrder){
                let orders = [];
                orders.push(rawOrder.dataValues);
                if (findOrder === null) {
                    res.send("Not found!");
                } else {
                    const object = {
                        mapOrder: orders.map(data => {
                            return {
                                id: data.id,
                                order_date: data.order_date,
                                amount: data.amount,
                                userId: data.userId,
                                bookId: data.bookId,
                            }
                        })
                    }
                    res.render('./order/show', {order: object.mapOrder});
                }
            });
        } else {
            order.findAll({
                attributes: ['id', 'order_date', 'amount', 'userId', 'bookId']
            }).then(function (rawOrders){
                const object = {
                    orders: rawOrders.map(data => {
                        return {
                            id: data.id,
                            order_date: data.order_date,
                            amount: data.amount,
                            userId: data.userId,
                            bookId: data.bookId,
                        }
                    })
                }
                res.render('./order/list', {orders: object.orders});
            }).catch(function (error){
                res.send("Error: " + error);
            });
        }
    }
}

module.exports = OrderController;