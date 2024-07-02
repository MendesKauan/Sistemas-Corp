// services/saleDetailsService.js

class saleDetailsService {
    
    constructor(saleDetailsModel, billsToReceiveService) {
        this.saleDetailsModel = saleDetailsModel;
        this.billsToReceiveService = billsToReceiveService;

    }

    async create(idSale, idProduct, soldAmount, unitPrice, installment, NF, expirationDate) {
        try {
            
            const newSaleDetail = await this.saleDetailsModel.create({
                idSale : idSale, 
                idProduct : idProduct, 
                soldAmount : soldAmount, 
                unitPrice : unitPrice,
                installment: installment,
                NF: NF
            }); 

            const totalSaleValue = soldAmount * unitPrice;
            const status = "aberto";

            await this.billsToReceiveService.create(totalSaleValue, installment, NF, idSale, status, expirationDate);

            return newSaleDetail ? newSaleDetail : null

        } catch (error) {
            
        }
    }

}

module.exports = saleDetailsService;