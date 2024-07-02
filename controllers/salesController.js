// controllers/salesController.js

class salesController {
    constructor(salesService) {
        this.salesService = salesService;
    }

    async create(req, res) {
        const {nameProduct, amount, installments, clientCPF} = req.body;

        try {
            const newSale = await this.salesService.create(nameProduct, amount, clientCPF, installments);
            res.status(200).json(newSale);

        } catch (error) {
            res.status(500).json({error:'erro ao criar nova venda'});
        }
    }

    async findByNF(req, res) {
        const { NF } = req.body;

        try {
            const sale = await this.salesService.findByNF(NF);
            res.status(200).json(sale);

        } catch (error) {
            console.error("Error finding sale by NF:", error);
            res.status(500).json({ error: 'Erro ao buscar venda pelo NF' });
        }
    }

    async findAll(req, res) {
        try {
            const sales = await this.salesService.findAll();
            res.status(200).json(sales);

        } catch (error) {
            console.error("Error finding all sales:", error);
            res.status(500).json({ error: 'Erro ao buscar todas as vendas' });
        }
    }

}

module.exports = salesController;