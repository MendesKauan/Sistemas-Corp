// services/movementBillsToReiceveServices.js
const moment = require('moment');

class movementBillsToReceiveServices {
    
    constructor(movementBillsToReceiveModel) {
        this.movementBillsToReceiveModel = movementBillsToReceiveModel;
    }

    async create(idTitle, typeMovement, movementValue, valueFine, valueInterest) {
        try {
            const dateMovement = moment().format('YYYY-MM-DD');

            const newMovement = await this.movementBillsToReceiveModel.create(
                {
                    idTitle: idTitle,
                    dateMovement: dateMovement,
                    typeMovement: typeMovement,
                    movementValue: movementValue,
                    valueFine: valueFine,
                    valueInterest: valueInterest
                }
            );

            return newMovement ? newMovement : null;
            
        } catch (error) {
            console.error("Error creating movement for bills to receive:", error);
            throw error;
        }
    }

}

module.exports = movementBillsToReceiveServices;