const mysql = require('mysql2');
const sql = require('/home/sql.js');
const connetion = mysql.createConnection(sql);

connetion.connect((err) => {
  if(!err) console.log('连接成功');
});

module.exports = connetion;