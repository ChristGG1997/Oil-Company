const { database } = require('./keys');
const { promisify } = require('util');
const mysql = require('mysql');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err){
        if (err === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON-COUNT_ERRROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB is Connected');
    return;

});

//Convert promisify
pool.query = promisify(pool.query);

module.exports = pool;