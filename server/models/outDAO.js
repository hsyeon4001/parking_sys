const dto = require('./outDTO');
const DBhandler = require('./DBhandler');
const moment = require('moment');

class OutDAO {
    constructor () {
        this.db = new DBhandler();
    }

    async searchParking(OutDTO) {
        const query = `SELECT t_id, in_time FROM parkings WHERE number = '${OutDTO.getNumber()}'`;
        
        try {
            return await this.db.getData(query);
        }
        catch {
            return -1;
        }
    }
    
    async calcParking(OutDTO) {        
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const in_time = moment(OutDTO.getTId());
        const parking_time = Math.floor(Math.abs(moment.duration(in_time.diff(now)).asMinutes()));
        const fee = parking_time / 10 * 500;
        
        try {
            return await { in_time, parking_time, fee };
        }
        catch {
            return -1;
        }
    }


    async paidParking(OutDTO) {
        const query = `UPDATE parkings SET paid_fee = '${OutDTO.getPaidFee()}', paid_type = '${OutDTO.getPaidType()}' WHERE number = '${OutDTO.getNumber()}'`;
        
        try {
            return await this.db.putData(query);
        }
        catch {            
            return -1;
        }

    }

}

module.exports = OutDAO;