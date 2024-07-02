// controllers/supplierController.js

class supplierController {
    
    constructor(supplierService) {
        this.supplierService = supplierService;
    }

    async create(req, res) {
        const {name, company} = req.body; 

        try {
            const newSupplier = await this.supplierService.create(name, company);
            res.status(200).json(newSupplier);

        } catch (error) {
            res.status(500).json({ error:'erro ao inserir novo Fornecedor' });
        }
    }
    
    async findAll(req, res) {
        try {
            const suppliers = await this.supplierService.findAll();
            res.status(200).json(suppliers);

        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar todos os fornecedores' });
        }
    }

    async findOne(req, res) {
        const { name } = req.body;

        try {
            const supplier = await this.supplierService.findOne(name);
            res.status(200).json(supplier);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar fornecedor' });
        }
    }

    async findAllByCompany(req, res) {
        const { company } = req.body;

        try {
            const suppliers = await this.supplierService.findAllByCompany(company);
            res.status(200).json(suppliers);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar fornecedores por empresa' });
        }
    }

    async update(req, res) {
        const { nameSupplier, updates } = req.body;

        try {
            const updatedSupplier = await this.supplierService.update(nameSupplier, updates);
            res.status(200).json(updatedSupplier);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
        }
    }
}

module.exports = supplierController;