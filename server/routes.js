const Express = require('express');
const Router = Express.Router();
const query = require('./routes/query')

Router.get('/unget', query);

Router.get('/', query);

module.exports = Router;