// services/clientService.js
const { Op } = require('sequelize');

class clientService {
    
    constructor(clientModel) {
        this.clientModel = clientModel;
    }

    async create(name, CPF) {
        try {

            const newClient = await this.clientModel.create (
                {
                    name : name,
                    CPF : CPF
                }
            );
            
            return newClient ? newClient  : null;

        } catch (error) {
            
        }
    }

    async findOneByNameOrCPF(nameOrCPF) {
        try {
            const client = await this.clientModel.findOne({
                where: {
                    [Op.or]: [
                        { name: nameOrCPF },
                        { CPF: nameOrCPF }
                    ]
                }
            });

            return client ? client : null;

        } catch (error) {
            console.error("Error finding client by name or CPF:", error);
            throw error;
        }
    }

    async findAll(limit = 10, offset = 0) {
        try {
            const clients = await this.clientModel.findAll({
                limit,
                offset
            });
            return clients;
        } catch (error) {
            console.error("Error finding all clients:", error);
            throw error;
        }
    }

}

module.exports = clientService;