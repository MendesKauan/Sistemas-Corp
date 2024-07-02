// services/departmentService.js

class departmentService {
    
    constructor(departmentModel, costCenterModel, productMovementService, proposalsService, proposalsModel, productModel, purchasesService, billsToPayService, billsToPayModel) {
        this.departmentModel = departmentModel;
        this.costCenterModel = costCenterModel;
        this.proposalsModel = proposalsModel;
        this.productModel = productModel;
        this.billsToPayModel = billsToPayModel; 

        this.productMovementService = productMovementService;
        this.proposalsService = proposalsService;
        this.purchasesService = purchasesService;
        this.billsToPayService = billsToPayService;
    }

    async create(name, codeCostCenter, balanceCostCenter) {

        try {
            const newCostCenter = await this.costCenterModel.create(
                {
                    code: codeCostCenter,
                    balance: balanceCostCenter
                }
            );

            const newDepartment = await this.departmentModel.create(
                {
                    name: name,
                    IdCostCenter: newCostCenter.id
                }
            );

            return newDepartment ? newDepartment : null
            
        } catch (error) {
            
        }

    }

    async materialRequisition(nameDeposit, nameProduct, quantityOutput, date) {
        try {
            const subtypeMovement = "transferencia";
            const newMaterialRequisition = await this.productMovementService.createOutput(nameDeposit, nameProduct, subtypeMovement, quantityOutput, date);

            return newMaterialRequisition ? newMaterialRequisition : null
            
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.status).json({ message: error.message });
            } 
        }
    }

    async buyMaterial(nameProduct, nameDeposit, quantity, installment, expirationDate) {
        try {

            const product = await this.productModel.findOne({ where: { name: nameProduct } });
            const proposals = await this.proposalsModel.findAll({where: { idProduct: product.id }});

            if(proposals.length < 3) {  throw new Error('Número insuficiente de propostas. É necessário pelo menos 3 propostas.'); }

            let bestOffer = proposals[0];

            for(const proposal of proposals) { if(proposal.proposedPrice < bestOffer.proposedPrice) { bestOffer = proposal; } } 

            let totalPurchaseValue = quantity * bestOffer.proposedPrice;
            const purchaseStatus = "Pendente";

            function generateRandomNumber(min = 100, max = 50000) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            let NF;
            let NFexists;

            do {
                NF = generateRandomNumber();
                NFexists = await this.billsToPayModel.findOne({ where: { NF : NF } });
            } while (NFexists);
        
            
            //compras
           const newPurchase = await this.purchasesService.create(bestOffer.IdSupplier, bestOffer.id, bestOffer.buyer, bestOffer.IdProduct, quantity, bestOffer.proposedPrice, purchaseStatus);

            const subtypeMovement = "compra";

            // registrar entrada de produtos
            await this.productMovementService.createInput(nameDeposit, nameProduct, subtypeMovement, quantity, bestOffer.proposedPrice, bestOffer.dateProposals);
           
            const status = "aberto";

            //registrar no contas a pagar
            await this.billsToPayService.create(totalPurchaseValue, installment, NF, newPurchase.id, status, expirationDate);


        } catch (error) {
            console.error("Error creating buy material", error);
            throw error;
        }
    }

    async findByName(nameDepartment) {
        try {

        const department = await this.departmentModel.findOne({
            where: {
                name: nameDepartment
            }
        });

            return department ? department : null;

        } catch (error) {
            
        }
    }

    async findAll(limit = 10, offset = 0, order = [['createdAt', 'DESC']]) {
        try {
            const departments = await this.departmentModel.findAll({
                limit: limit,
                offset: offset,
                order: order
            });
            return departments;

        } catch (error) {
            console.error("Error finding departments:", error);
            throw error;
        }
    }

    async update(nameDepartment, updates) {
        try {
            const department = await this.departmentModel.findOne({ where: { name: nameDepartment } });

            if (!department) { throw new Error('Department not found'); }

            if (updates.name) { department.name = updates.name; }

            if (updates.codeCostCenter) { 
                const costCenter = await this.costCenterModel.findOne({ where: { id: department.IdCostCenter } });

                if (!costCenter) { throw new Error('Cost Center not found'); }

                costCenter.code = updates.codeCostCenter;
                await costCenter.save();
            }

            await department.save();
            return department;
            
        } catch (error) {
            
        }
    }

    async addMoneyToCostCenter(nameDepartment, amountToAdd) {
        try {
            const department = await this.departmentModel.findOne({ where: { name: nameDepartment } });

            if (!department) {
                throw new Error('Department not found');
            }

            const costCenter = await this.costCenterModel.findOne({ where: { id: department.IdCostCenter } });

            if (!costCenter) {
                throw new Error('Cost Center not found');
            }

            costCenter.balance += amountToAdd;
            await costCenter.save();

            return costCenter;

        } catch (error) {
            console.error("Error adding money to cost center:", error);
            throw error;
        }
    }
}

module.exports = departmentService;