// ../services/depositService

class depositService {
    constructor(depositModel) {
        this.DepositModel = depositModel;
    }

    async create(name, active) {
        try {
            const newDeposit = await this.DepositModel.create(
                {
                    name: name,
                    active: active
                }
            )

            return newDeposit ? newDeposit : null;
            
        } catch (error) {
            
        }
    }

    async update(DepositName, updates) {
        try {
            const deposit = await this.DepositModel.findOne({
                where: {
                    name: DepositName
                }
            });

            await deposit.update(updates);
            return deposit;
            
        } catch (error) {
            
        }
    }

    async getAllDeposit(limit = 10, offset = 0, order = [['createdAt', 'DESC']]) {
        try {
            const AllDeposits = this.DepositModel.findAll({
                limit: limit,
                offset: offset,
                order: order
            });

            return AllDeposits ? AllDeposits : null;

        } catch (error) {
            throw error;
        }
    }

    async getDepositByName(DepositName) {
        try {
            const DepositByName = this.DepositModel.findOne({
                where: {
                    name: DepositName
                }
            })

            return DepositByName ? DepositByName : null;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = depositService;
