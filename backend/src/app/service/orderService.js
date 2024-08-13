const con = require('../configdb/connectDB')

class orderService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`Select od.*, c.*, d.district, t.city from orderproduct od
                inner join account a on a.id = od.accountID
                inner join customer c on c.id = a.customerID
                inner join addressdistrict d on d.id = c.districtID
                inner join addresscity t on t.id = d.cityID;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findByAccount(accountID) {
        return new Promise((resolve, reject) => {
            con.query(`Select od.*, c.*, d.district, t.city from orderproduct od
                inner join account a on a.id = od.accountID
                inner join customer c on c.id = a.customerID
                inner join addressdistrict d on d.id = c.districtID
                inner join addresscity t on t.id = d.cityID
                where accountID = ${accountID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    // findByAccount(accountID) {
    //     return new Promise((resolve, reject) => {
    //         con.query(`Select od.*, p.*, op.*, c.* from orderdetail od
    //             inner join orderproduct op on op.id = od.orderID
    //             inner join product p on p.id = od.productID
    //             inner join account a on a.id = op.accountID
    //             inner join customer c on c.id = a.customerID
    //             where a.id = ${accountID};`, function (error, result, fields) {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             resolve(result);
    //         });
    //     })
    // }

    findNewOrderByAccount(accountID) {
        return new Promise((resolve, reject) => {
            con.query(`Select Max(id) as max from orderproduct where accountID = ${accountID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createOrder(total, statusID, paymentMethod, accountID, paymentStatus) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO orderproduct(total, statusID, paymentMethod, accountID, paymentStatus) VALUES (${total}, ${statusID}, ${paymentMethod}, ${accountID}, ${paymentStatus});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createOrderDetail(orderID, productID, quantity) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO orderdetail(orderID, productID, quantity) VALUES (${orderID}, ${productID}, ${quantity});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

}

module.exports = new orderService()