const Express = require('express');
const Router = Express.Router();

const login = require('./routes/login')
const carga = require('./routes/carga')
const guest = require('./routes/guest')

const insertU = require('./routes/user/insert');
const selectU = require('./routes/user/select');
const updateU = require('./routes/user/update');
const deleteU = require('./routes/user/delete');
const depa = require('./routes/user/dep');

Router.post('/loginn', login);
Router.post('/carga', carga);
Router.get('/guest', guest)

Router.post('/insertU', insertU);
Router.put('/updateU', updateU);
Router.get('/selectU', selectU);
Router.put('/deleteU', deleteU);
Router.get('/depa', depa);

module.exports = Router;