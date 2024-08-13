const con = require('../configdb/connectDB')

class productService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`Select c.*, count(d.category) as quantity from product d 
                inner join category c on c.id = d.category
                group by (d.category);`, function (error, result, fields) {
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