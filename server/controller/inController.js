const DBhandler = require('../models/DBhandler');
const InDAO = require('../models/inDAO');
const InDTO = require('../models/inDTO');
const validNum = require('./exception');

class ParkingIn {
    
    constructor () {
        this.db = new DBhandler();
    }


    async showIn(res) {
        try {
            await res.render('form', { title: '주차등록입니당', action: '/in', method:'POST', submit: 'IN!' });
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


    async addParking(inData, res) {
        const db = this.db;
        const dao = new InDAO();
        const dto = new InDTO();
        const { number } = inData;

        if (validNum(number) === -1) {
            return res.status(400).send(`
                <script>
                    alert('올바른 차량번호가 아닙니다.');
                    window.location.href = 'http://localhost:3001/in';
                </script>
            `);  
        }
        else {
            dto.setNumber(number);
        }

        try {
            const result = await dao.searchTicket(dto);
            
            if (result.length !== 0) {
                const t_id = result[0].id;
                dto.setTId(t_id);
                await dao.addParking(dto, res);
            } 
            else {
                const t_id = 1;
                dto.setTId(t_id);                
                await dao.addParking(dto, res);
            }

            return await res.send(`
                <script>
                    alert('주차 등록되었습니다.');
                    window.location.href = 'http://localhost:3001/';
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

module.exports = ParkingIn;