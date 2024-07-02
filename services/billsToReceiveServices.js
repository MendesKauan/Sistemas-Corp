class billsToReceiveServices {

    constructor(billsToReceiveModel, movementBillsToReceiveServices, clientModel) {
        this.billsToReceiveModel = billsToReceiveModel;
        this.movementBillsToReceiveServices = movementBillsToReceiveServices;
        this.clientModel = clientModel;
    }

    async create(totalSaleValue, installment, NF, idSale, status, expirationDate) {
        try {
            if (installment > 1) {
                totalSaleValue = totalSaleValue / installment;
                const createdBillsToReceive = [];

                for (let i = 1; i <= installment; i++) {
                    const newBillsToReceive = await this.billsToReceiveModel.create({
                        totalSaleValue: totalSaleValue,
                        installment: i,
                        NF: NF,
                        idSale: idSale,
                        status: status,
                        expirationDate: expirationDate
                    });

                    createdBillsToReceive.push(newBillsToReceive);
                }

                const typeMovement = "abertura";
                await this.movementBillsToReceiveServices.create(createdBillsToReceive[0].id, typeMovement, totalSaleValue, 0, 0);

                return createdBillsToReceive;

            } else {
                const newBillsToReceive = await this.billsToReceiveModel.create({
                    totalSaleValue: totalSaleValue,
                    installment: installment,
                    NF: NF,
                    idSale: idSale,
                    status: status,
                    expirationDate: expirationDate
                });

                const typeMovement = "abertura";
                await this.movementBillsToReceiveServices.create(newBillsToReceive.id, typeMovement, totalSaleValue, 0, 0);

                return newBillsToReceive ? newBillsToReceive : null;
            }

        } catch (error) {
            console.error("Error creating bills to receive:", error);
            throw error;
        }
    }

    async receiveBill(NF, clientCPF) {
        try {
            const bill = await this.billsToReceiveModel.findOne({
                where: { NF: NF, status: "aberto" },
                order: [['installment', 'ASC']]
            });
    
            if (!bill) {
                console.log("Fatura não encontrada para NF:", NF);
                return null; // Ou outra ação adequada
            }
    
            const client = await this.clientModel.findOne({ where: { CPF: clientCPF } });
    
            if (!client) {
                throw new Error('Cliente não encontrado');
            }
    
            const status = "recebido";
    
            bill.status = status;
            await bill.save();
    
            const typeMovement = status;
            await this.movementBillsToReceiveServices.create(bill.id, typeMovement, bill.totalSaleValue, 0, 0);
    
            return bill;
        } catch (error) {
            console.error("Error receiving bill:", error);
            throw error;
        }
    }
    
    async cancelBill(NF) {
        try {
            const billsToCancel = await this.billsToReceiveModel.findAll({ where: { NF: NF } });
            
            if (!billsToCancel || billsToCancel.length === 0) { throw new Error('Fatura não encontrada'); }

            for (let bill of billsToCancel) {
                if (bill.status === 'recebido') { throw new Error('Não é possível cancelar uma fatura já recebida'); }

                const canceledStatus = "cancelado";
                bill.status = canceledStatus;
                await bill.save();

                const typeMovement = canceledStatus;
                await this.movementBillsToReceiveServices.create(bill.id, typeMovement, 0, 0, 0);
            }

            return billsToCancel;
        } catch (error) {
            console.error("Error canceling bill:", error);
            throw error;
        }
    }

    async findOne(NF, limit = 10, offset = 0, order = [['createdAt', 'DESC']]) {
        try {
            const bills = await this.billsToReceiveModel.findOne({
                where: {NF: NF},
                limit: limit,
                offset: offset,
                order: order
            });
            return bills;
        } catch (error) {
            console.error("Error finding bill:", error);
            throw error;
        }
    }
    
    async findAll(limit = 10, offset = 0, order = [['createdAt', 'DESC']]) {
        try {
            const bills = await this.billsToReceiveModel.findAll({
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

module.exports = billsToReceiveServices;
