const user = require('./user');
const active = require('./active');

module.exports = (express)=>{
  express.use('/api', user);
  express.use('/api', active);
};