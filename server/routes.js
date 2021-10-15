const Express = require('express');
const Router = Express.Router();
const login = require('./routes/login')
const carga = require('./routes/carga')


Router.get('/login', login);

Router.get('/carga', carga);

//Router.get('/', query);

module.exports = Router;