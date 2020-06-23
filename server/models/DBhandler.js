//DB connection pool 형성, 연결 시도 및 해제, 실질적인 DB 연동작업(query메소드 사용하는 곳)

const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv').config({path: path.join(__dirname, '../config/env/.env')});

class DBhandler {

    constructor() {
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectionLimit: 10,
            dateStrings: 'date'
        });
    }


    connect() {        
        this.connection.connect();
    }


    disconnect() {
        this.connection.end();
    }


    putData(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                query,
                (err, result) => {
                    return err? resolve(err) : resolve(result);
                }
            )
        })
    }


    getData(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                query,
                (err, result) => {
                    return err? resolve(result) : resolve(result);
                }
            )
        })
    }

}

module.exports = DBhandler;
