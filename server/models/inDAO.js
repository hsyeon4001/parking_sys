const dto = require('./inDTO');
const DBhandler = require('./DBhandler');
const moment = require('moment');

class InDAO {

    constructor() {
        this.db = new DBhandler();
    }

    
    async searchTicket(InDTO) {
        const query = `SELECT id FROM tickets WHERE p_number = '${InDTO.getNumber()}'`;
        
        try {
            return await this.db.getData(query);
        }
        catch {
            return -1;
        }
    }


    async addParking(InDTO, res) {
        const in_time = moment().format('YYYY-MM-DD HH:mm:ss');
        const query = `INSERT INTO parkings(number, in_time, t_id) VALUES ('${InDTO.getNumber()}', '${in_time}', '${InDTO.getTId()}')`;

        try {
            const result = await this.db.putData(query);

            if (result.errno) {
                return await res.status(400).send(`
                    <script>
                        alert('이미 주차중인 차량입니다.');
                        window.location.href = 'http://localhost:3001/in';
                    </script>
                `);
            }
        }
        catch {
            return -1;
        }
    }

}

module.exports = InDAO;