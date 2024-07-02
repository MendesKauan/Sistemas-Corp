const CustomError = require("../Errors/CustomError");

class billsToReceiveController {

    constructor(billsToReceiveServices) {
        this.billsToReceiveServices = billsToReceiveServices;
    }

    async receiveBill(req, res) {
        const { NF, clientCPF } = req.body;

        try {
            const bills = await this.billsToReceiveServices.receiveBill(NF, clientCPF);
            res.status(200).json(bills);
        } catch (error) {
            console.error("Error receiving bill:", error);
            res.status(500).json({ error: "Erro ao receber fatura", message: error.message });
        }
    }

    async cancelBill(req, res) {
        const { NF } = req.body;

        try {
            const billsToCancel = await this.billsToReceiveServices.cancelBill(NF);
            res.status(200).json(billsToCancel);
        } catch (error) {
            console.error("Error canceling bill:", error);
            res.status(500).json({ error: "Erro ao cancelar fatura", message: error.message });
        }
    }

    async findOne(req, res) {
        const { NF } = req.body;

        try {
            const bill = await this.billsToReceiveServices.findOne(NF);
            res.status(200).json(bill);
        } catch (error) {
            console.error("Error finding bill:", error);
            res.status(500).json({ error: "Erro ao buscar fatura", message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const bills = await this.billsToReceiveServices.findAll();
            res.status(200).json(bills);
        } catch (error) {
            console.error("Error finding bills:", error);
            res.status(500).json({ error: "Erro ao buscar faturas", message: error.message });
        }
    }

}

module.exports = billsToReceiveController;
