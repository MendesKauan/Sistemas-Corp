// controllers/purchasesController.js

class purchasesController {
    
    constructor(purchasesService) {
        this.purchasesService = purchasesService;
    }

    async findOne(req, res) {
        const { IdPurchase } = req.body;

        try {
            const purchase = await this.purchasesService.purchasesFindOne(IdPurchase);
            res.status(200).json(purchase);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar compra' });
        }
    }

    async findAll(req, res) {
        try {
            const purchases = await this.purchasesService.findAll();
            res.status(200).json(purchases);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar todas as compras' });
        }
    }
}

module.exports = purchasesController;