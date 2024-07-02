// ./models/user.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        IdDepartment: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });

    User.associate = (models) => {
        User.belongsTo(models.Department, { foreignKey: 'IdDepartment', as: 'department' });
        User.hasMany(models.Proposals, { foreignKey: 'buyer' });
        User.hasMany(models.Purchases, { foreignKey: 'Idbuyer' });
    }

    return User;
}


