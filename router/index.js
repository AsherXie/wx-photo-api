const user = require('./user')
const active = require('./active')

module.exports = (express)=>{
    express.use('/', user)
    express.use('/', active)

}