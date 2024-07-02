// services\costCenterService.js
const CustomError = require("../Errors/CustomError");
class costCenterService {
    
    constructor(costCenterModel, departmentModel) {
        this.costCenterModel = costCenterModel;
        this.departmentModel = departmentModel
    }

    async create(code, balance){
        try {
            if(balance <= 0) { throw new CustomError("Não pode registrar valor igual ou menor que zero", 400)}

            const newCostCenter = this.costCenterModel.create(
                {
                    code: code,
                    balance: balance
                }
            );

            return newCostCenter ? newCostCenter : null

        } catch (error) {
            
        }
    }

    async findByCode(code) {
        const costCenter = await this.costCenterModel.findOne({where: {code: code}});

        if (costCenter) {
            const department = await this.departmentModel.findOne({ where: { IdCostCenter: costCenter.id } });
            return { costCenter: costCenter, department: department || null };
        } else {
            return null;
        }
    }

    async findAll(limit = 10, offset = 0) {
        try {
            const costCenters = await this.costCenterModel.findAll({ limit, offset });
            const costCentersWithDepartments = await Promise.all(costCenters.map(async (costCenter) => {
                const department = await this.departmentModel.findOne({ where: { IdCostCenter: costCenter.id } });
                return { costCenter: costCenter, department: department || null };
            }));
            return costCentersWithDepartments;
        } catch (error) {
            console.error("Error finding cost centers:", error);
            throw error;
        }
    }

    
}

module.exports = costCenterService;