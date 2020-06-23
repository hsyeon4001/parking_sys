const DBhandler = require('../models/DBhandler');
const OutDAO = require('../models/outDAO');
const OutDTO = require('../models/outDTO');
const validNum = require('./exception');

class ParkingOut {

    constructor () {
        this.db = new DBhandler();
    }


    async showOut(res) {
        try {
            await res.render('form', { title: '요금정산입니당', action: '/out/number', method:'GET',  submit: 'PAY!'  });
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


    async searchParking(outData, res) {
        const db = this.db;
        const dao = new OutDAO();
        const dto = new OutDTO();
        const { number } = outData;
        
        if (validNum(number) === -1) {
            return res.status(400).send(`
            <script>
                alert("올바른 차량번호가 아닙니다.");
                window.location.href = 'http://localhost:3001/out';
            </script>
            `);  
        }
        else {
            dto.setNumber(number);
        }

        try {
            const result = await dao.searchParking(dto);

            if ( result.length === 0 ) {
                return res.status(400).send(`
                    <script>
                        alert("주차중인 차량이 아닙니다.");
                        window.location.href = 'http://localhost:3001/out';
                    </script>
                `);  
                }
            //result[0] else 처리
            const { t_id, in_time } = result[0];

            if (t_id === 1) {
                dto.setTId(in_time);
                const parkingData = await dao.calcParking(dto);
                const { parking_time, fee } = parkingData;
                
                await res.render('payment', { title: '요금결제입니당', number: number, in_time: in_time, parking_time: parking_time, fee: fee });
            } 
            else {
                dto.setPaidFee(0);
                dto.setPaidType('ticket');
                await dao.passParking(dto);

                return await res.status(200).send(`
                    <script>
                        alert('정기주차 차량입니다.');
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


    async payParking(outData, res) {
        const db = this.db;
        const dao = new OutDAO();
        const dto = new OutDTO();
        let { number, paid_fee, paid_type } = outData;
        paid_fee = paid_fee.replace('원', '');
        dto.setNumber(number);
        dto.setPaidFee(paid_fee);
        dto.setPaidType(paid_type);

        try {
            const result = await dao.paidParking(dto);
            console.log(result);
            return await res.status(200).send(`
            <script>
                alert('주차 요금이 결제되었습니다.');
                window.location.href = 'http://localhost:3001';
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

module.exports = ParkingOut;