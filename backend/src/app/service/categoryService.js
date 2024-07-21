const con = require('../configdb/connectDB')

class productService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`Select * from category`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(name, group) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO category(name, category.group) VALUES ('${name}', ${group});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

}

module.exports = new productService()