const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const BillsToReceive = sequelize.define('BillsToReceive', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        totalSaleValue: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        installment: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        NF: {
            type: Sequelize.STRING,
            allowNull: false
        },
        idSale: {
            type: Sequelize.INTEGER,
            allowNull: false, 
            references: {
                model: 'Sales', 
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expirationDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    BillsToReceive.associate = (models) => {
        BillsToReceive.belongsTo(models.Sales, { foreignKey: 'idSale' });
        BillsToReceive.hasMany(models.movementBillsToReceive, { foreignKey: 'idTitle' });
    }

    return BillsToReceive;
}
