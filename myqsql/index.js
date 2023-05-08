const mysql = require('mysql2');
const connetion = mysql.createConnection({
  host: process.env.host,
  port: process.env.port,
  database: process.env.database,
  password: process.env.password,
  user: process.env.user
});

connetion.connect((err) => {
  if(!err) console.log('连接成功');
});

module.exports = connetion;