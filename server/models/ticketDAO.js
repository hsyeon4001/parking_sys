const dto = require('./ticketDTO');
const DBhandler = require('./DBhandler');
const moment = require('moment');

class TicketDAO {

    constructor() {
        this.db = new DBhandler();
    }

    
    async addTicket(TicketDTO, res) {
        const service_start = moment().format('YYYY-MM-DD HH:mm:ss');
        const service_end = moment().add(Number(TicketDTO.getExpireDate()), 'M').format('YYYY-MM-DD HH:mm:ss');
        const query = `INSERT INTO tickets(start_date, expire_date,p_number) VALUES ('${service_start}', '${service_end}', '${TicketDTO.getPNumber()}')`;

        try {
            const result = await this.db.putData(query);
            
            if (result.errno) {
                return await res.status(400).send(`
                    <script>
                        alert("이미 등록된 차량입니다.");
                        window.location.href = 'http://localhost:3001/ticket';
                    </script>
                `);
            }
        }
        catch {
            return -1;
        }
    }

}

module.exports = TicketDAO;