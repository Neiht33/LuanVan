const con = require('../configdb/connectDB')

class productService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`Select p.*, c.name as categoryName, c.group from product p inner join category c on c.id = p.category;`,
                function (error, result, fields) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        })
    }

    create(name, img, price, quantity, age, category, description, gender) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO product(name, img, price, quantity, age, category, description, gender, wareHouse) VALUES ('${name}', '${img}', ${price}, ${quantity}, ${age}, ${category}, '${description}', ${gender}, ${quantity});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    uploadMultiple(img, id) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO supportproduct(supportImg, IDProduct) VALUES ('${img}', ${id});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findNewID() {
        return new Promise((resolve, reject) => {
            con.query(`Select max(id) as IDMax from product;`, function (error, result, fields) {
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