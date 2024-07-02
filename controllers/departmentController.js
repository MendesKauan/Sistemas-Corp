// ./controller/departmentController.js
const CustomError = require("../Errors/CustomError");

class departmentController {

    constructor(departmentService) {
        this.departmentService = departmentService;
    }

    async create(req, res) {
        const {name, codeCostCenter, balanceCostCenter} = req.body;

        try {

            const newDepartment = await this.departmentService.create(name, codeCostCenter, balanceCostCenter);
            res.status(200).json(newDepartment);
            
        } catch (error) {
            
        }
    }

    async materialRequisition(req, res) {
        const {nameDeposit, nameProduct, quantityOutput, date} = req.body;

        try {
            const newMaterialRequisition = await this.departmentService.materialRequisition(nameDeposit, nameProduct, quantityOutput, date);
            res.status(200).json(newMaterialRequisition);
            
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.status).json({ message: error.message });
            } 
        }
    }

    async buyMaterial(req, res){
        const {nameProduct, quantity, nameDeposit, installment, expirationDate} = req.body;

        try {
            const newBuyMaterial = await this.departmentService.buyMaterial(nameProduct, nameDeposit, quantity, installment, expirationDate);
            res.status(200).json(newBuyMaterial);
        } catch (error) {
            
        }
    }

    async findByName(req, res) {
        const {departmentName} = req.body;

        try {
            const department = await this.departmentService.findByName(departmentName);
            res.status(200).json(department);
        } catch (error) {
            
        }
    }

    async findAll(req, res) {
        try {
            const departments = await this.departmentService.findAll();
            res.status(200).json(departments);
        } catch (error) {
            
        }
    }

    async update(req, res) {
        const { nameDepartment, updates } = req.body;
        try {
            const department = await this.departmentService.update(nameDepartment, updates);
            res.status(200).json(department);
        } catch (error) {
            
        }
    }

    async addMoneyToCostCenter(req, res) {
        const { nameDepartment, amountToAdd } = req.body;
        try {
            const costCenter = await this.departmentService.addMoneyToCostCenter(nameDepartment, amountToAdd);
            res.status(200).json(costCenter);

        } catch (error) {
            console.error("Error adding money to cost center:", error);
            res.status(500).json({ error: 'Erro ao adicionar dinheiro ao centro de custo' });
        }
    }
}

module.exports = departmentController;