'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'SET NULL'
      });
      this.belongsTo(models.Book, {
        foreignKey: 'bookId',
        onDelete: 'SET NULL'
      });
    }
  };
  Order.init({
    order_date: DataTypes.DATE,
    amount: DataTypes.DOUBLE,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};