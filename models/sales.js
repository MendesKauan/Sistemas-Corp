const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Sales = sequelize.define('Sales', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        NF: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dateSale: {
            type: Sequelize.DATE,
            allowNull: false
        },
        idClient: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    Sales.associate = (models) => {
        Sales.belongsTo(models.Client, { foreignKey: 'idClient' });
        Sales.hasMany(models.SaleDetails, { foreignKey: 'idSale' });
        Sales.hasMany(models.BillsToReceive, { foreignKey: 'idSale' });
    }

    return Sales;
}
