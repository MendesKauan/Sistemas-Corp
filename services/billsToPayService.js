// services/billsToPayService.js

class billsToPayService {
    
    constructor(billsToPayModel, departmentModel, costCenterModel, movementBillsToPayService) {
        this.billsToPayModel = billsToPayModel;
        this.movementBillsToPayService = movementBillsToPayService;
        this.departmentModel = departmentModel;
        this.costCenterModel = costCenterModel;
    }

    async create(totalPurchaseValue, installment, NF, IdPurchase, status, expirationDate) {
        try {

            if(installment > 1) { 
                totalPurchaseValue = totalPurchaseValue/installment;
                const createdBillsToPay = [];

                for(let i=1; i<=installment; i++) {

                    const newbillsToPay = await this.billsToPayModel.create(
                        {
                            totalPurchaseValue : totalPurchaseValue,
                            installment : i,
                            NF : NF,
                            IdPurchase : IdPurchase,
                            status : status,
                            expirationDate : expirationDate
                        }
                    );

                    createdBillsToPay.push(newbillsToPay);
                }

                const typeMovement = "abertura";
                await this.movementBillsToPayService.create(createdBillsToPay[0].id, typeMovement, totalPurchaseValue, 0, 0);

                return createdBillsToPay

            }
            else {
                
                const newbillsToPay = await this.billsToPayModel.create(
                    {
                        totalPurchaseValue : totalPurchaseValue,
                        installment : installment,
                        NF : NF,
                        IdPurchase : IdPurchase,
                        status : status,
                        expirationDate : expirationDate
                    }
                );
                
                const typeMovement = "abertura";
                await this.movementBillsToPayService.create(newbillsToPay.id, typeMovement, totalPurchaseValue, 0, 0);

                return newbillsToPay ? newbillsToPay : null;
            }
            


        } catch (error) {
            console.error("Error creating bills to pay:", error);
            throw error;
        }
    }

    async payBill(NF, nameDepartment) {
        try {

            const bill = await this.billsToPayModel.findOne({ where:{ NF: NF, status:"aberto"}, order: [['installment', 'ASC']]});

            const department = await this.departmentModel.findOne({ where: { name: nameDepartment }});

            const costCenter = await this.costCenterModel.findOne({where: {id: department.IdCostCenter}});

            if(costCenter.balance < bill.totalPurchaseValue) {throw new error('Saldo insuficiente para pagamento')}

            costCenter.balance -= bill.totalPurchaseValue;

            await costCenter.save();

            const status = "pago";

            bill.status = status;
            await bill.save();

            const typeMovement = status;
            await this.movementBillsToPayService.create(bill.id, typeMovement,bill.totalPurchaseValue, 0, 0);

            return bill;
        } catch (error) {
            console.log(error);
        }
    }

    async cancelBill(NF) {
        try {

            const billsToCancel = await this.billsToPayModel.findAll({ where: { NF: NF } });
            
            if (!billsToCancel || billsToCancel.length === 0) { throw new Error('Fatura não encontrada'); }

            for (let bill of billsToCancel) {
                if (bill.status === 'pago') { throw new Error('Não é possível cancelar uma fatura já paga'); }

                const canceledStatus = "cancelado";
                bill.status = canceledStatus;
                await bill.save();

                const typeMovement = canceledStatus;
                await this.movementBillsToPayService.create(bill.id, typeMovement, 0, 0, 0);
            }

            return billsToCancel ;
            
        } catch (error) {
            console.log(error);
        }
    }

    async findByNF(NF, limit = 10, offset = 0, order = [['createdAt', 'DESC']]) {
        try {
            const bill = await this.billsToPayModel.findAll({
                where: { NF: NF },
                limit: limit,
                offset: offset,
                order: order
            });
            return bill;
        } catch (error) {
            console.error("Error finding bill:", error);
            throw error;
        }
    }

    async findAll(limit = 10, offset = 0, order = [['createdAt', 'DESC']]) {
        try {
            const bills = await this.billsToPayModel.findAll({
                limit: limit,
                offset: offset,
                order: order
            });
            return bills;
        } catch (error) {
            console.error("Error finding bills:", error);
            throw error;
        }
    }


}

module.exports = billsToPayService;