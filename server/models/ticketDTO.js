class TicketDTO {

    constructor() {
        this.start_date;
        this.expire_date;
        this.p_number;
    }

    getStartDate() {
        return this.start_date;
    }

    getExpireDate() {
        return this.expire_date;
    }

    getPNumber() {
        return this.p_number;
    }

    setStartDate(start_date) {
        this.start_date = start_date;
    }

    setExpireDate(expire_date) {
        this.expire_date = expire_date;
    }

    setPNumber(p_number) {
        this.p_number = p_number;
    }
}

module.exports = TicketDTO;