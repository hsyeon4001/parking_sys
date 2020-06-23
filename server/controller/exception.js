
//차량번호 유효성 확인
const validNum = carNum => {
        const car_validation = /^([0-9]{2,3}[가-힣]{1}[0-9]{4})/;
        const pass = car_validation.test(carNum);

        if (pass) {
            return 1;
            
        } 
        else {
            return -1;
            
        }
    }

module.exports = validNum;