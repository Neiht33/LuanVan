const con = require('../configdb/connectDB')

class orderService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`Select op.*, op.id as orderID, c.*, d.district, t.city from orderproduct op
                inner join account a on a.id = op.accountID
                inner join customer c on c.id = a.customerID
                inner join addressdistrict d on d.id = c.districtID
                inner join addresscity t on t.id = d.cityID
                order by op.time desc;`, function (error, result, fields) {
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
            con.query(`Select op.id as orderID, op.*, c.*, d.district, t.city, s.status from orderproduct op
                inner join account a on a.id = op.accountID
                inner join customer c on c.id = a.customerID
                inner join addressdistrict d on d.id = c.districtID
                inner join addresscity t on t.id = d.cityID
                inner join status s on s.id = op.statusID
                where a.id = ${accountID}
                order by op.time desc;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOrderDetailByOrderID(orderID) {
        return new Promise((resolve, reject) => {
            con.query(`Select od.*, p.*, p.discount as discountCurrent, od.discount, od.quantity as quantityCurrent from orderdetail od
                inner join orderproduct op on op.id = od.orderID
                inner join product p on p.id = od.productID
                inner join account a on a.id = op.accountID
                inner join customer c on c.id = a.customerID
                where od.orderID = ${orderID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOrderDetailByAccountID(accountID) {
        return new Promise((resolve, reject) => {
            con.query(`Select od.*, p.*, od.quantity as quantityCurrent from orderdetail od
                inner join orderproduct op on op.id = od.orderID
                inner join product p on p.id = od.productID
                inner join account a on a.id = op.accountID
                inner join customer c on c.id = a.customerID
                where op.accountID = ${accountID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

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

    statisticsByDay() {
        return new Promise((resolve, reject) => {
            con.query(`select Sum(total) as total, Date(time) as time from orderproduct
                where Date(time) = CURDATE() and statusID = 4 
                group by Date(time);`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    statisticsByMonth() {
        return new Promise((resolve, reject) => {
            con.query(`select Sum(total) as total, month(time) as month from orderproduct
                where year(time) = year(curdate()) and statusID = 4 
                group by Month(time);`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    statisticsByDayInMonth() {
        return new Promise((resolve, reject) => {
            con.query(`select Sum(total) as total, day(time) as day from orderproduct
            where year(time) = year(curdate()) and month(time) = month(curdate()) and statusID = 4 
            group by day(time);`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    statisticsOrderByMonth() {
        return new Promise((resolve, reject) => {
            con.query(`select Count(id) as quantity, Month(time) as month from orderproduct
                where year(time) = year(curdate()) and statusID = 4 
                group by Month(time);`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    statisticsOrderByDayInMonth() {
        return new Promise((resolve, reject) => {
            con.query(`select Count(id) as quantity, day(time) as day from orderproduct
                where year(time) = year(curdate()) and month(time) = month(curdate()) and statusID = 4 
                group by day(time);`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    statisticsByDayOfWeek() {
        return new Promise((resolve, reject) => {
            con.query(`select Sum(total) as total, dayofweek(time) as day from orderproduct
                where date(time) in (SELECT
                DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) + INTERVAL i DAY AS day_of_week
                FROM
                (SELECT 0 AS i UNION ALL
                SELECT 1 UNION ALL
                SELECT 2 UNION ALL
                SELECT 3 UNION ALL
                SELECT 4 UNION ALL
                SELECT 5 UNION ALL
                SELECT 6) AS days
                ORDER BY
                i) and statusID = 4
                group by dayofweek(time);`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    statisticsOrderByDayOfWeek() {
        return new Promise((resolve, reject) => {
            con.query(`select Count(id) as quantity, dayofweek(time) as day from orderproduct
                where date(time) in (SELECT
                DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) + INTERVAL i DAY AS day_of_week
                FROM
                (SELECT 0 AS i UNION ALL
                SELECT 1 UNION ALL
                SELECT 2 UNION ALL
                SELECT 3 UNION ALL
                SELECT 4 UNION ALL
                SELECT 5 UNION ALL
                SELECT 6) AS days
                ORDER BY
                i) and statusID = 4
                group by dayofweek(time);`, function (error, result, fields) {
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

    createOrderDetail(orderID, productID, quantity, discount) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO orderdetail(orderID, productID, quantity, discount) VALUES (${orderID}, ${productID}, ${quantity}, ${discount});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    updateStatus(orderID, status, paymentStatus) {
        return new Promise((resolve, reject) => {
            con.query(`Update orderproduct
                Set statusID = ${status} ${paymentStatus ? `, paymentStatus = ${paymentStatus}` : ''}
                where id = ${orderID};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    updateRated(orderID, productID) {
        return new Promise((resolve, reject) => {
            con.query(`Update orderdetail
                Set ratedStatus = 1
                where orderID = ${orderID} and productID = ${productID};`, function (error, result, fields) {
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