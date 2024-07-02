// services/proposalsService.js

class proposalsService {
    
    constructor(proposalsModel, supplierModel, productModel, userModel) {
        this.proposalsModel = proposalsModel;
        this.supplierModel = supplierModel;
        this.productModel = productModel;
        this.userModel = userModel;
    }

    async create(nameProduct, nameSupplier, proposedPrice, dateProposals, buyer, expirationDate) {
        try {
            const product = await this.productModel.findOne({ where: { name: nameProduct } });
            if (product == null) { throw new CustomError("Produto não encontrado", 404); }

            const supplier  = await this.supplierModel.findOne({ where: { name: nameSupplier } });
            if (supplier == null) { throw new CustomError("Fornecedor não encontrado", 404); }

            const buyerUser = await this.userModel.findOne({ where: { name: buyer } });
            if (buyerUser == null) { throw new CustomError("Usuario não encontrado", 404); }

            const newProposals = await this.proposalsModel.create (
                {
                    IdProduct : product.id,
                    IdSupplier : supplier.id,
                    proposedPrice : proposedPrice,
                    dateProposals: dateProposals,
                    buyer : buyerUser.id,
                    expirationDate : expirationDate
                }
            )
            
            return newProposals ? newProposals  : null;

        } catch (error) {
            
        }
    }

    async findOneByName(nameProduct) {
        try {
            const product = await this.productModel.findOne({ where: { name: nameProduct } });
            if (product == null) { throw new CustomError("Produto não encontrado", 404); }

            const proposal = await this.proposalsModel.findAll({ where: { IdProduct: product.id } });
            return proposal ? proposal : null;
        } catch (error) {
            console.error("Error finding proposal by product name:", error);
            throw error;
        }
    }

    async findAll(limit = 10, offset = 0) {
        try {
            const proposals = await this.proposalsModel.findAll({ limit, offset });
            return proposals;
        } catch (error) {
            console.error("Error finding proposals:", error);
            throw error;
        }
    }
}

module.exports = proposalsService;