const dto = require('./checkDTO');
const DBhandler = require('./DBhandler');
const moment = require('moment');

class CheckDAO {
    constructor () {
        this.db = new DBhandler();
    }

    
    async verifyParking(CheckDTO) {
        const query = `SELECT paid_type FROM parkings WHERE number = '${CheckDTO.getNumber()}'`;

        try {
            return await this.db.getData(query);
        }
        catch {
            return -1;
        }
    }


    async switchParking(CheckDTO) {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const query = `UPDATE parkings SET out_time = '${now}' WHERE number = '${CheckDTO.getNumber()}'`;

        try {
            return await this.db.putData(query);
        }
        catch {
            return -1;
        }
    } 


    async removeParking(CheckDTO) {
        const query = `DELETE FROM parkings WHERE number='${CheckDTO.getNumber()}'`;
        
        try {
            return await this.db.putData(query);
        }
        catch {
            return -1;
        }
    }

}

module.exports = CheckDAO;