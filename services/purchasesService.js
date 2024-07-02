class purchasesService {
    
    constructor(purchasesModel) {
        this.purchasesModel = purchasesModel;
    }

    async create(IdSupplier, IdProposal, Idbuyer, IdProduct, totalAmount, unitPrice, purchaseStatus) {
        try {
            const newPurchase = await this.purchasesModel.create(
                {
                    IdSupplier: IdSupplier,
                    IdProposal: IdProposal, 
                    Idbuyer: Idbuyer, 
                    IdProduct: IdProduct, 
                    totalAmount: totalAmount, 
                    unitPrice: unitPrice, 
                    purchaseStatus: purchaseStatus,
                }
            );

            return newPurchase ? newPurchase : null


        } catch (error) {
            
        }
     }

     async purchasesFindOne(IdPurchase) {
        try {
            const purchase = await this.purchasesModel.findOne(
            {
                where: {
                    id: IdPurchase
                }
            }
         );

         return purchase ? purchase : null;

        } catch (error) {
            
        }
     } 

    async findAll(limit = 10, offset = 0) {
        try {
            const purchases = await this.purchasesModel.findAll({
                limit,
                offset
            });
            return purchases;
        } catch (error) {
            console.error("Error finding purchases:", error);
            throw error;
        }
    }

}

module.exports = purchasesService;