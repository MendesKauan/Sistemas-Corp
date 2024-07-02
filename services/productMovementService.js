
const CustomError = require("../Errors/CustomError");
const { Op } = require('sequelize');

class productMovementService {

    constructor(productMovementModel, productModel, depositModel) {
        this.productMovementModel = productMovementModel;
        this.productModel = productModel;
        this.depositModel = depositModel;
    }

    async getCurrentQuantity(productId, depositId) {
        const lastMovement = await this.productMovementModel.findOne({
            where: {
                IdProduct: productId,
                IdDeposit: depositId
            },
            order: [['date', 'DESC']]
        });
    
        return lastMovement ? lastMovement.currentQuantity : 0;

    }

    async createInput(nameDeposit, nameProduct, subtypeMovement, quantityInput, unitPrice, date) {
        try {

            const product = await this.productModel.findOne({ where: { name: nameProduct } });

            if (product == null) { throw new CustomError("Produto não encontrado", 404); }

            const deposit = await this.depositModel.findOne({ where: { name: nameDeposit } });

            if (deposit == null) { throw new CustomError("Depósito não encontrado", 404); }

            
            const typeMovement = "entrada";

            let currentQuantity = await this.getCurrentQuantity(product.id, deposit.id);

            if(quantityInput <= 0) { 
                throw new CustomError("Não pode gravar valores iguais ou menores que zero", 404); 
            }
            
            currentQuantity += quantityInput;

            const newMovementInput = await this.productMovementModel.create(
                {
                    IdProduct: product.id,
                    IdDeposit: deposit.id,
                    typeMovement: typeMovement,
                    subtypeMovement: subtypeMovement,
                    currentQuantity: currentQuantity,
                    quantityInputOutput: quantityInput,
                    unitPrice: unitPrice,
                    date: date
                }
            );

            return newMovementInput? newMovementInput : null;



        } catch (error) {
        
        }
    }

    async createOutput(nameDeposit, nameProduct, subtypeMovement, quantityOutput, date) {
        try {
            const product = await this.productModel.findOne({ where: { name: nameProduct } });
            if (product == null) { throw new CustomError("Produto não encontrado", 404); }

            const deposit = await this.depositModel.findOne({ where: { name: nameDeposit } });
            if (deposit == null) { throw new CustomError("Depósito não encontrado", 404); }

            const typeMovement = "saida";
            let currentQuantity = await this.getCurrentQuantity(product.id, deposit.id);

            if (quantityOutput <= 0) {
                throw new CustomError("Não pode retirar valores menores ou iguais a zero", 404);
            }

            if (quantityOutput > currentQuantity) {
                throw new CustomError("Não pode retirar valores maiores que a quantidade atual", 404);
            }

            if (currentQuantity === 0) {
                throw new CustomError("Produto sem estoque", 400);
            }

            currentQuantity -= quantityOutput;

            const lastMovement = await this.productMovementModel.findOne({
                where: {
                    IdProduct: product.id,
                    IdDeposit: deposit.id
                },
                order: [['date', 'DESC']]
            });

            const newMovementOutput = await this.productMovementModel.create({
                IdProduct: product.id,
                IdDeposit: deposit.id,
                typeMovement: typeMovement,
                subtypeMovement: subtypeMovement,
                currentQuantity: currentQuantity,
                quantityInputOutput: quantityOutput,
                unitPrice: lastMovement.unitPrice, 
                date: date
            });

            return newMovementOutput ? newMovementOutput : null;

        } catch (error) {
            console.error(error);
        }
    }

    async findAllByProduct(productId, limit = 10, offset = 0, order = [['date', 'DESC']]) {
        try {
            const movements = await this.productMovementModel.findAll({
                where: { IdProduct: productId },
                limit: limit,
                offset: offset,
                order: order
            });
            return movements;
        } catch (error) {
            console.error("Error finding movements by product:", error);
            throw error;
        }
    }

    async findAllByDeposit(depositId, limit = 10, offset = 0, order = [['date', 'DESC']]) {
        try {
            const movements = await this.productMovementModel.findAll({
                where: { IdDeposit: depositId },
                limit: limit,
                offset: offset,
                order: order
            });
            return movements;
        } catch (error) {
            console.error("Error finding movements by deposit:", error);
            throw error;
        }
    }

    async findAllByDateRange(startDate, endDate, limit = 10, offset = 0, order = [['date', 'DESC']]) {
        try {

            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);

            const movements = await this.productMovementModel.findAll({
                where: {
                    date: {
                        [Op.between]: [start, end]
                    }
                },
                limit: limit,
                offset: offset,
                order: order
            });
            return movements;
        } catch (error) {
            console.error("Error finding movements by date range:", error);
            throw error;
        }
    }

}

module.exports = productMovementService;
