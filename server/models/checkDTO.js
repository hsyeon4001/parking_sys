class CheckDTO {

    constructor() {
        this.number;
        this.in_time;
        this.out_time;
        this.paid_fee;
        this.paid_type;
        this.t_id;
    }

    getNumber() {
        return this.number;
    }

    getInTime() {
        return this.in_time;
    }

    getOutTime() {
        return this.out_time;
    }

    getPaidFee() {
        return this.paid_fee;
    }

    getPaidType() {
        return this.paid_type;
    }

    getTId() {
        return this.t_id;
    }

    setNumber(number) {
        this.number = number;
    }

    setInTime(in_time) {
        this.in_time = in_time;
    }

    setOutTime(out_time) {
        this.out_time = out_time;
    }

    setPaidFee(paid_fee) {
        this.paid_fee = paid_fee;
    }

    setPaidType(paid_type) {
        this.paid_type = paid_type;
    }

    setTId(t_id) {
        this.t_id = t_id;
    }
}

module.exports = CheckDTO;