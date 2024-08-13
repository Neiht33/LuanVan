const con = require('../configdb/connectDB')

class cartService {

    findAll(accountID) {
        return new Promise((resolve, reject) => {
            con.query(`Select cd.id as idCartDetail, cd.quantity as quantityCurrent, cd.total, c.total as totalFinal, p.* from cartdetail cd
                inner join cart c on c.id = cd.cartID
                inner join account a on a.id = c.accountID
                inner join product p on p.id = cd.productID
                where a.id = ${accountID}
                order by cd.id desc;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOneByCart(productID, cartID) {
        return new Promise((resolve, reject) => {
            con.query(`Select * from cartdetail
                where productID = ${productID} and cartID = ${cartID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOneByAccountID(accountID) {
        return new Promise((resolve, reject) => {
            con.query(`Select * from cart
                where accountID = ${accountID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(accountID, total) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO cart(accountID, total) VALUES (${accountID}, ${total});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    addCartDetail(productID, quantity, total, cartID) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO cartdetail(productID, quantity, total, cartID) VALUES (${productID}, ${quantity}, ${total}, ${cartID});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    updateCart(cartID) {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE cart
            SET total = (select Sum(total) from cartdetail where cartID = ${cartID})
            WHERE id = ${cartID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    updateCartDetail(productID, quantity, total, cartID) {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE cartdetail
            SET quantity = ${quantity}, total = ${total}
            WHERE productID = ${productID} and cartID = ${cartID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    deleteItemCartDetail(productID, cartID) {
        return new Promise((resolve, reject) => {
            con.query(`Delete from cartdetail where productID = ${productID} and cartID = ${cartID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    deleteCartDetail(cartID) {
        return new Promise((resolve, reject) => {
            con.query(`Delete from cartdetail where cartID = ${cartID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
}

module.exports = new cartService()