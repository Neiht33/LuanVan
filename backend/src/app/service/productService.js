const con = require('../configdb/connectDB')

class productService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`select p.*, c.name as categoryName, c.group from product p 
                inner join category c on c.id = p.category;`,
                function (error, result, fields) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        })
    }

    findByPage(first, last) {
        return new Promise((resolve, reject) => {
            con.query(`select * from (
                Select ROW_NUMBER() OVER(ORDER BY p.id) as inx, p.*, c.name as categoryName, c.group from product p 
                inner join category c on c.id = p.category) as allproduct
                where inx between ${first} and ${last};`,
                function (error, result, fields) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        })
    }

    findBySeekAdminPage(seek) {
        return new Promise((resolve, reject) => {
            con.query(`select p.*, c.name as categoryName, c.group from product p 
                inner join category c on c.id = p.category
                where p.name like '%${seek}%';`,
                function (error, result, fields) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        })
    }

    findBySeekPage(seek, first, last) {
        return new Promise((resolve, reject) => {
            con.query(`select * from (
                Select ROW_NUMBER() OVER(ORDER BY p.id) as inx, p.*, c.name as categoryName, c.group from product p 
                inner join category c on c.id = p.category
                where p.name like '%${seek}%') as allproduct
                where inx between ${first} and ${last};`,
                function (error, result, fields) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        })
    }

    findByCategoryID(id, first, last) {
        return new Promise((resolve, reject) => {
            con.query(`select * from (
                Select ROW_NUMBER() OVER(ORDER BY p.id) as inx, p.*, c.name as categoryName, c.group from product p 
                inner join category c on c.id = p.category
                where p.category = ${id}) as allproduct
                where inx between ${first} and ${last};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findByCategoryIDSeek(seek, id, first, last) {
        return new Promise((resolve, reject) => {
            con.query(`select * from (
                Select ROW_NUMBER() OVER(ORDER BY p.id) as inx, p.*, c.name as categoryName, c.group from product p 
                inner join category c on c.id = p.category
                where p.category = ${id}
                and p.name like '%${seek}%') as allproduct
                where inx between ${first} and ${last};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findByCategoryFilter(price1, price2, age, gender, seek, categoryID, first, last) {
        return new Promise((resolve, reject) => {
            con.query(`select * from (select ROW_NUMBER() OVER(ORDER BY p.id) as inx, p.* from product p where
                ${price1 ? `(p.price - (p.price * p.discount) / 100) >= ${price1} and (p.price - (p.price * p.discount) / 100) <= ${price2}` : ''}
                ${(price1 && age) ? `and p.age = ${age}` : (age ? `p.age = ${age}` : '')}
                ${((price1 && gender) || (age && gender)) ? `and p.gender = ${gender}` : (gender ? `p.gender = ${gender}` : '')}
                ${price1 ? 'and' : age ? 'and' : gender ? 'and' : ''} p.name like '%${seek}%'
                and p.category = ${categoryID}) as allproduct
                where inx between ${first} and ${last};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findByFilter(price1, price2, age, gender, seek, first, last) {
        return new Promise((resolve, reject) => {
            con.query(`select * from (select ROW_NUMBER() OVER(ORDER BY p.id) as inx, p.* from product p where
                ${price1 ? `(p.price - (p.price * p.discount) / 100) >= ${price1} and (p.price - (p.price * p.discount) / 100) <= ${price2}` : ''}
                ${(price1 && age) ? `and p.age = ${age}` : (age ? `p.age = ${age}` : '')}
                ${((price1 && gender) || (age && gender)) ? `and p.gender = ${gender}` : (gender ? `p.gender = ${gender}` : '')}
                ${price1 ? 'and' : age ? 'and' : gender ? 'and' : ''} p.name like '%${seek}%') as allproduct
                where inx between ${first} and ${last};`, function (error, result, fields) {
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

    findProductDiscount() {
        return new Promise((resolve, reject) => {
            con.query(`Select * from product 
                order by discount desc;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    getTotalByFilter(price1, price2, age, gender, seek) {
        return new Promise((resolve, reject) => {
            con.query(`select p.* from product p where
                ${price1 ? `p.price >= ${price1} and p.price <= ${price2}` : ''}
                ${(price1 && age) ? `and p.age = ${age}` : (age ? `p.age = ${age}` : '')}
                ${((price1 && gender) || (age && gender)) ? `and p.gender = ${gender}` : (gender ? `p.gender = ${gender}` : '')}
                ${price1 ? 'and' : age ? 'and' : gender ? 'and' : ''} p.name like '%${seek}%';`,
                function (error, result, fields) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        })
    }

    getTotalByCategoryFilter(price1, price2, age, gender, seek, categoryID) {
        return new Promise((resolve, reject) => {
            con.query(`select p.* from product p where
                ${price1 ? `p.price >= ${price1} and p.price <= ${price2}` : ''}
                ${(price1 && age) ? `and p.age = ${age}` : (age ? `p.age = ${age}` : '')}
                ${((price1 && gender) || (age && gender)) ? `and p.gender = ${gender}` : (gender ? `p.gender = ${gender}` : '')}
                ${price1 ? 'and' : age ? 'and' : gender ? 'and' : ''} p.name like '%${seek}%'
                and p.category = ${categoryID};`,
                function (error, result, fields) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        })
    }

    findOneByID(id) {
        return new Promise((resolve, reject) => {
            con.query(`select d.*, c.name as categoryName from product d
                inner join category c on c.id = d.category 
                where d.id = ${id};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findSupportImg(id) {
        return new Promise((resolve, reject) => {
            con.query(`select * from supportproduct s where s.IDProduct = ${id};`, function (error, result, fields) {
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

    updateProductIncrease(name, price, category, description, oldWareHouse, newWareHouse, id) {
        return new Promise((resolve, reject) => {
            con.query(`Update product
                Set name = '${name}',
                price = ${price},
                category = ${category},
                description = '${description}',
                wareHouse = ${newWareHouse},
                quantity = quantity + (${newWareHouse} - ${oldWareHouse})
                where id = ${id};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    updateProductDecrease(name, price, category, description, oldWareHouse, newWareHouse, id) {
        return new Promise((resolve, reject) => {
            con.query(`Update product
                Set name = '${name}',
                price = ${price},
                category = ${category},
                description = '${description}',
                wareHouse = ${newWareHouse},
                quantity = quantity - (${oldWareHouse} - ${newWareHouse})
                where id = ${id};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    updateDiscount(id, discount) {
        return new Promise((resolve, reject) => {
            con.query(`Update product
                Set discount = ${discount}
                where id = ${id};`, function (error, result, fields) {
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

    updateQuantityProductReduce(quantity, productID) {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE product
                SET wareHouse = wareHouse - ${quantity}
                WHERE id = ${productID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    updateQuantityProductAdd(quantity, productID) {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE product
            SET wareHouse = wareHouse + ${quantity}
            WHERE id = ${productID};`, function (error, result, fields) {
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