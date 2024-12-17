const con = require('../configdb/connectDB')

class productService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT c.*,
                COUNT(p.id) AS quantity
                FROM category c
                LEFT JOIN product p ON c.id = p.category
                GROUP BY c.id;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(name, group, img) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO category(name, category.group, img) VALUES ('${name}', ${group}, '${img}');`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    update(id, name, group) {
        return new Promise((resolve, reject) => {
            con.query(`Update category c
                set c.name = '${name}', c.group = ${group}
                where c.id = ${id};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            con.query(`Delete from category
                where id = ${id};`, function (error, result, fields) {
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