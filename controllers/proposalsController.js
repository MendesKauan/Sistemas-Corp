// controllers/proposalsController.js

class proposalsController {
    
    constructor(proposalsService) {
        this.proposalsService = proposalsService;
    }

    async create(req, res) {
        const {nameProduct, nameSupplier, proposedPrice, dateProposals, buyer, expirationDate} = req.body; 

        try {
            const newProposals = await this.proposalsService.create(nameProduct, nameSupplier, proposedPrice, dateProposals, buyer, expirationDate);
            res.status(200).json(newProposals);

        } catch (error) {
            res.status(500).json({error:'erro ao inserir nova proposta'});
        }
    }
    
    async findOneByName(req, res) {
        const { nameProduct } = req.body;

        try {
            const proposal = await this.proposalsService.findOneByName(nameProduct);
            if (proposal) {
                res.status(200).json(proposal);
            } else {
                res.status(404).json({ error: 'Proposta não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar proposta' });
        }
    }

    async findAll(req, res) {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;

        try {
            const proposals = await this.proposalsService.findAll(limit, offset);
            res.status(200).json(proposals);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar propostas' });
        }
    }
}

module.exports = proposalsController;