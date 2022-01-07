const Sequelize = require('sequelize');
const sequelize = new Sequelize('ssp_ca3', 'root', 'root', {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}