const con = require('../configdb/connectDB')

class customerService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`Select * from customer`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOneByPhone(phoneNumber) {
        return new Promise((resolve, reject) => {
            con.query(`Select c.*, d.district, t.city from customer c
                inner join addressdistrict d on d.id = c.districtID
                inner join addresscity t on t.id = d.cityID
                where c.phoneNumber = '${phoneNumber}'`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOneByPhoneHadAccount(phoneNumber) {
        return new Promise((resolve, reject) => {
            con.query(`Select c.*, a.*, d.district, t.city from customer c
                inner join account a on a.customerID = c.id 
                inner join addressdistrict d on d.id = c.districtID
                inner join addresscity t on t.id = d.cityID
                where c.phoneNumber = ${phoneNumber};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createCustomer(name, phoneNumber, address, districtID) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO customer(name, phoneNumber, address, districtID) VALUES ('${name}', '${phoneNumber}', '${address}', ${districtID});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

}

module.exports = new customerService()