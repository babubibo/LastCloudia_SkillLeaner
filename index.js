var mysql = require('mysql2');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12311108',
    database: 'lc_image',
    port: 3306
});

conn.connect();

conn.query('SELECT 12 +34 AS result', function (err, rows, fields) {
    if (err) throw err;
    console.log('The result is: ', rows[0].result);
});

conn.end();