// services/salesService.js
const moment = require('moment');

class salesService {
    
    constructor(saleModel, saleDetailsServices, clientModel, productMovementService, depositModel, productModel) {
        this.saleModel = saleModel;
        this.saleDetailsServices = saleDetailsServices; 
        this.clientModel = clientModel;
        this.depositModel = depositModel;
        this.productModel = productModel;
        this.productMovementService = productMovementService;

    }

    async create(nameProduct, amount, clientCPF, installments) {
        try {
            const client = await this.clientModel.findOne({ where: { CPF: clientCPF }});
            if(!client) { throw new error('Cliente não encontrado')}

            const product = await this.productModel.findOne({ where: { name: nameProduct }});
            if(!product) { throw new error('Produto não encontrado')}

            const deposits = await this.depositModel.findAll();

            const soldAmount = amount;

            for (const deposit of deposits) {
                if (amount <= 0) break;
    
                let currentQuantity = await this.productMovementService.getCurrentQuantity(product.id, deposit.id);
    
                if (currentQuantity > 0) {
                    const quantityToRemove = Math.min(currentQuantity, amount);
    
                    await this.productMovementService.createOutput(deposit.name, product.name, 'venda', quantityToRemove, new Date());
    
                    amount -= quantityToRemove;
                }
            }
    
            if (amount > 0) { throw new Error('Estoque insuficiente para completar a venda'); }

            function generateRandomNumber(min = 100, max = 50000) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            let NF;
            let NFexists;

            do {
                NF = generateRandomNumber();
                NFexists = await this.saleModel.findOne({ where: { NF : NF } });
            } while (NFexists);

            const dateSale = moment().format('YYYY-MM-DD');

            const newSale = await this.saleModel.create(
                {   
                    NF : NF,
                    dateSale: dateSale,
                    idClient: client.id
                }
            );

            const unitPriceProduct = await this.productMovementService.findByProduct(nameProduct);

            const expirationDate = moment().add(7, 'days').format('YYYY-MM-DD');

            await this.saleDetailsServices.create(newSale.id, product.id, soldAmount, unitPriceProduct.unitPrice, installments, NF, expirationDate);


            return newSale;

        } catch (error) {
            
        }
    }

    async findByNF(NF) {
        try {
            const sale = await this.saleModel.findOne({ 
                where: { NF: NF },
                include: [{
                    model: this.saleDetailsServices.saleDetailsModel,
                    as: 'SaleDetails'
                }]
            });
            return sale ? sale : null;
        } catch (error) {
            console.error("Error finding sale by NF:", error);
            throw error;
        }
    }

    async findAll(limit = 10, offset = 0, order = [['createdAt', 'DESC']]) {
        try {
            const sales = await this.saleModel.findAll({
                limit: limit,
                offset: offset,
                order: order,
                include: [{
                    model: this.saleDetailsServices.saleDetailsModel,
                    as: 'SaleDetails'
                }]
            });
            return sales;

        } catch (error) {
            console.error("Error finding all sales:", error);
            throw error;
        }
    }

}

module.exports = salesService;