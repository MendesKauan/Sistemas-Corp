// services/supplierService.js

class supplierService {
    
    constructor(supplierModel) {
        this.supplierModel = supplierModel;
    }

    async create(name, company) {
        try {
            const newSupplier = await this.supplierModel.create (
                {
                    name : name,
                    company : company,
                }
            )
            
            return newSupplier ? newSupplier  : null;

        } catch (error) {
            
        }
    }

    async findOne(name) {
        try {
            const supplier = await this.supplierModel.findOne({ where: { name: name } });
            return supplier ? supplier : null;
        } catch (error) {
            console.error("Error finding supplier:", error);
            throw error;
        }
    }

    async findAllByCompany(company) {
        try {
            const suppliers = await this.supplierModel.findAll({ where: { company: company } });
            return suppliers;
        } catch (error) {
            console.error("Error finding suppliers by company:", error);
            throw error;
        }
    }
    
    async findAll(limit = 10, offset = 0) {
        try {
            const suppliers = await this.supplierModel.findAll({
                limit,
                offset
            });
            return suppliers;
        } catch (error) {
            console.error("Error finding suppliers:", error);
            throw error;
        }
    }

    async update(nameSupplier, updates) {
        try {
            const supplier = await this.supplierModel.findOne({ where: { name: nameSupplier } });

            if (!supplier) {
                throw new Error("Supplier not found");
            }

            if (updates.name) supplier.name = updates.name;
            if (updates.company) supplier.company = updates.company;

            await supplier.save();
            return supplier;

        } catch (error) {
            console.error("Error updating supplier:", error);
            throw error;
        }
    }

}

module.exports = supplierService;