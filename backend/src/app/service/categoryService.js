const con = require('../configdb/connectDB')

class productService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`Select c.*, count(c.id) as quantity from category c
                left join product d on d.category = c.id
                group by c.id;`, function (error, result, fields) {
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