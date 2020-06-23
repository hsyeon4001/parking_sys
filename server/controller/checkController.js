const DBhandler = require('../models/DBhandler');
const CheckDAO = require('../models/checkDAO');
const CheckDTO = require('../models/checkDTO');
const validNum = require('./exception');

class ParkingCheck {

    constructor () {
        this.db = new DBhandler();
    }


    async showCheck(res) {
        try {
            await res.render('form', { title: '주차종료입니당', action: '/check/number', method:'POST', submit: 'OUT!' });
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


    async verifyParking(checkData, res) {
        const db = this.db;
        const dao = new CheckDAO();
        const dto = new CheckDTO();
        const { number } = checkData;

        if (validNum(number) === -1) {
            return res.status(400).send(`
                <script>
                    alert('올바른 차량번호가 아닙니다.');
                    window.location.href = 'http://localhost:3001/check';
                </script>
            `);  
        }
        else {
            dto.setNumber(number);
        }

        try {
            const result = await dao.verifyParking(dto);
            const paid_type = result[0].paid_type;

            if ( result.length === 0 ) {
                return res.status(400).send(`
                    <script>
                        alert('주차중인 차량이 아닙니다.');
                        window.location.href = 'http://localhost:3001/check';
                    </script>
                `);  
            }
            
            if (paid_type === null) {
                return res.status(400).send(`
                    <script>
                        alert('주차요금 결제 후 출차 가능합니다.');
                        window.location.href = 'http://localhost:3001/check';
                    </script>
                `);  
            }
            else {
                await dao.switchParking(dto);
                await dao.removeParking(dto);
                return await res.status(200).send(`
                    <script>
                        alert('출차 처리되었습니다. 안녕히 가십시오.');
                        window.location.href = 'http://localhost:3001';
                    </script>
                `);  
            }
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

module.exports = ParkingCheck;