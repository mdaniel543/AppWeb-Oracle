const Express = require('express');
const Router = Express.Router();
const login = require('./routes/login')
const carga = require('./routes/carga')
const guest = require('./routes/guest')


Router.post('/loginn', login);

Router.get('/carga', carga);

Router.get('/guest', guest)

//Router.get('/', query);

module.exports = Router;