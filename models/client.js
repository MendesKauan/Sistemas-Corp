// models/client.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const Client = sequelize.define('Client', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    
        CPF: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    Client.associate = (models) => {
        Client.hasMany(models.Sales, { foreignKey: 'idClient' });
    }

    return Client;
}


