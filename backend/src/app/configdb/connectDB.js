var mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'thienthien2',
    database: 'luanvan'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Đã kết nối tới MySQL!');
});

// con.getConnection(function (err, connection) {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         return;
//     }
//     console.log('Connected to database successfully');
//     // Do something with the connection if needed
//     connection.release(); // Always release the connection when done with it
// });

module.exports = con 