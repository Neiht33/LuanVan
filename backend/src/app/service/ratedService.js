const con = require('../configdb/connectDB')

class ratedService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`Select * from rated;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findByProductID(productID) {
        return new Promise((resolve, reject) => {
            con.query(`Select r.*, c.name from rated r
                inner join account a on a.id = r.accountID
                inner join customer c on c.id = a.customerID 
                where productID = ${productID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(accountID, productID, rated, comment) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO rated(accountID, productID, rate, comment) VALUES (${accountID}, ${productID}, ${rated}, '${comment}');`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

}

module.exports = new ratedService()