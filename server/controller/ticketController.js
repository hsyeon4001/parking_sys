const DBhandler = require('../models/DBhandler');
const TicketDAO = require('../models/ticketDAO');
const TicketDTO = require('../models/ticketDTO');
const validNum = require('./exception');

class Ticket {
    
    constructor () {
        this.db = new DBhandler();
    }


    async showTicket(res) {
        try {
            await res.render('ticket', { title: '정기권 구입입니당', submit: 'BUY!' });
        }
        catch {            
            return -1
        }
    }


    async addTicket(ticketData, res) {
        const db = this.db;
        const dao = new TicketDAO();
        const dto = new TicketDTO();
        const {expire_date, p_number} = ticketData;

        if (validNum(p_number) === -1) {
            return res.status(400).send(`
                <script>
                    alert('올바른 차량번호가 아닙니다.');
                    window.location.href = 'http://localhost:3001/ticket';
                </script>
            `);  
        }
        else {
            dto.setExpireDate(expire_date);
            dto.setPNumber(p_number);
        }

        try {
            await dao.addTicket(dto, res);
            return await res.status(200).send(`
                <script>
                    alert('정기주차 차량으로 등록되었습니다.');
                    window.location.href = 'http://localhost:3001/ticket';
                </script>
            `);  
        }
        catch {
            return await res.status(500).send(`
                <script>
                    alert('잠시 후 재시도 바랍니다.');
                    window.location.href = 'http://localhost:3001/';
                </script>
            `);
        }
    }

}

module.exports = Ticket;