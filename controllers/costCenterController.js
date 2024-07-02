// controllers/costCenterController.js

class costCenterController {
    constructor(costCenterService) {
        this.costCenterService = costCenterService;
    }

    async create(req, res) {
        const { code, balance } = req.body;
        try {
            const newCostCenter = await this.costCenterService.create(code, balance);
            res.status(200).json(newCostCenter);
        } catch (error) {
            
        }
    }

    async findByCode(req, res) {
        const { code } = req.body;
        try {
            const CostCenter = await this.costCenterService.findByCode(code);
            res.status(200).json(CostCenter);
        
        } catch (error) {
            
        }
    }

    async findAll(req, res) {
        try {
            const CostCenters = await this.costCenterService.findAll();
            res.status(200).json(CostCenters);
        
        } catch (error) {
            
        }
    }





}

module.exports = costCenterController;