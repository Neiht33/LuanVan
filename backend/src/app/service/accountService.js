const con = require('../configdb/connectDB')

class accountService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`Select a.*, c.*  from account a inner join customer c on c.id = a.customerID;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOneByCustomerID(id) {
        return new Promise((resolve, reject) => {
            con.query(`Select a.id from account a where a.customerID = ${id};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createAccount(customerID, password, level) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO account(customerID, password, level) VALUES (${customerID}, '${password}', ${level});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    getCity() {
        return new Promise((resolve, reject) => {
            con.query(`Select * from addresscity order by city;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    getDistrictFromCity(id) {
        return new Promise((resolve, reject) => {
            con.query(`Select * from addressdistrict a where a.cityID = ${id} order by district;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

}

module.exports = new accountService()