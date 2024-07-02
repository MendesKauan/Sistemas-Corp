// controllers/clientController.js

class clientController {
    constructor(clientService) {
        this.clientService = clientService;
    }

    async create(req, res) {
        const {name, CPF} = req.body;

        try {
            const newClient = await this.clientService.create(name, CPF);
            res.status(200).json(newClient);

        } catch (error) {
            res.status(500).json({error:'erro ao inserir novo cliente'});
        }
    }

    async findOneByNameOrCPF(req, res) {
        const { nameOrCPF } = req.body;

        try {
            const client = await this.clientService.findOneByNameOrCPF(nameOrCPF);
            res.status(200).json(client);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cliente por nome ou CPF' });
        }
    }

    async findAll(req, res) {
        try {
            const clients = await this.clientService.findAll();
            res.status(200).json(clients);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar todos os clientes' });
        }
    }
    

}

module.exports = clientController;