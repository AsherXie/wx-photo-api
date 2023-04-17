const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./router/index');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

Router(app)


app.listen(3000, () => {
  console.log(999);
});
