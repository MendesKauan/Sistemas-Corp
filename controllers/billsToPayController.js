// controllers/billsToPayController.js
const CustomError = require("../Errors/CustomError");

class billsToPayController {

    constructor(billsToPayService) {
        this.billsToPayService = billsToPayService;
    }

    async payBill(req, res) {
        const {NF, nameDepartment} = req.body;

        try {
            const bills = await this.billsToPayService.payBill(NF, nameDepartment);
            res.status(200).json(bills);
            
        } catch (error) {
            
        }
    }

    async cancelBill(req, res) {
        const { NF } = req.body;

        try {
            const billsToCancel = await this.billsToPayService.cancelBill(NF);
            res.status(200).json(billsToCancel);
            
        } catch (error) {
            console.log(error);
        }
    }

    async findByNF(req, res) {
        const { NF } = req.body;

        try {
            const bill = await this.billsToPayService.findByNF(NF);
            res.status(200).json(bill);
        } catch (error) {
            console.error("Error finding bill:", error);
            res.status(500).json({ error: "Erro ao buscar fatura", message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const bills = await this.billsToPayService.findAll();
            res.status(200).json(bills);
        } catch (error) {
            console.error("Error finding bills:", error);
            res.status(500).json({ error: "Erro ao buscar faturas", message: error.message });
        }
    }
}

module.exports = billsToPayController;