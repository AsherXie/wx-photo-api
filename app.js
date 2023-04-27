const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./router/index');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
Router(app);

app.get('/', (_, res)=>{
  res.status(200).type('html').send('123123123123');
});

app.listen(9988, () => {
  console.log(999);
});
