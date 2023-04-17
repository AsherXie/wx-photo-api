const mysql = require("mysql2");
const connetion = mysql.createConnection({
  host: "47.108.194.232",
  port: 3306,
  password: "123456789",
  user: "root",
  database: "WX_TEST",
});

connetion.connect((err) => {
  console.log("连接成功");
});

module.exports = connetion