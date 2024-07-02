// ./controller/productMovementController.js


const CustomError = require("../Errors/CustomError");

class productMovementController {

    constructor(productMovementService) {
        this.productMovementService = productMovementService;
    }

    async createInput(req, res) {
        const {nameDeposit, nameProduct, subtypeMovement, quantityInput, unitPrice, date} = req.body;
        try {

         const newMovementInput = await this.productMovementService.createInput(nameDeposit, nameProduct, subtypeMovement, quantityInput, unitPrice, date);
         res.status(200).json(newMovementInput);
            
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.status).json({ message: error.message });
            } 
        }
    }

    async createOutput(req, res) {
        const {nameDeposit, nameProduct, subtypeMovement, quantityOutput, date} = req.body;
        try {
            
            const newMovementOutput = await this.productMovementService.createOutput(nameDeposit, nameProduct, subtypeMovement, quantityOutput, date);
            res.status(200).json(newMovementOutput);

        } catch (error) {
            
        }
    }

    async findAllByProduct(req, res) {
        const { productId } = req.body;
        try {
            const product = await this.productMovementService.findAllByProduct(productId);
            res.status(200).json(product);
        } catch (error) {
            
        }
    }

    async findAllByDeposit(req, res) {
        const { depositId } = req.body;
        try {
            const deposit = await this.productMovementService.findAllByDeposit(depositId);
            res.status(200).json(deposit);
        } catch (error) {
            
        }
    }

    async findAllByDateRange(req, res) {
        const { startDate, endDate } = req.body;
        try {
            const movementDateRange = await this.productMovementService.findAllByDateRange(startDate, endDate);
            res.status(200).json(movementDateRange);
        } catch (error) {
            
        }
    }

}

module.exports = productMovementController;