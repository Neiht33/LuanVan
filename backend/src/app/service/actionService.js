const con = require('../configdb/connectDB')

class actionService {

    findAllCategory(accountID) {
        return new Promise((resolve, reject) => {
            con.query(`select c.name, a.objectId, a.type, a.accountID, count(a.objectId) from action a
                inner join category c on c.id = a.objectId
                where a.type = 2 and a.accountID = ${accountID}
                group by a.objectId, a.type, a.accountID`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(accountID, objectID, type) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO action(accountID, objectID, type) VALUES (${accountID}, ${objectID}, ${type});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
}

module.exports = new actionService()