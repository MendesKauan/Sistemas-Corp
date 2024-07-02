// services/movementBillsToPayService.js
const moment = require('moment');

class movementBillsToPayService {
    
    constructor(movementBillsToPayModel) {
        this.movementBillsToPayModel = movementBillsToPayModel;
    }

    async create(idTitle, typeMovement, movementValue, valueFine, valueInterest) {
        try {
            const dateMovement = moment().format('YYYY-MM-DD');

            const newMovementBillsToPay = await this.movementBillsToPayModel.create(
                {
                    idTitle : idTitle,
                    dateMovement : dateMovement,
                    typeMovement : typeMovement,
                    movementValue : movementValue,
                    valueFine : valueFine,
                    valueInterest : valueInterest
                }
            );
            return newMovementBillsToPay ? newMovementBillsToPay : null;

        } catch (error) {
            console.error("Error creating bills to pay:", error);
            throw error;
        }
    }

}

module.exports = movementBillsToPayService;