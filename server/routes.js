const Express = require('express');
const Router = Express.Router();

const login = require('./routes/login')
const carga = require('./routes/carga')

const guest = require('./routes/guest')
const searchGuest = require('./routes/searchGuest');

const depa = require('./routes/dep');
const catego = require('./routes/catego');
const upload = require('./routes/upload');


const insertU = require('./routes/user/insert');
const selectU = require('./routes/user/select');
const updateU = require('./routes/user/update');
const deleteU = require('./routes/user/delete');
const searchU = require('./routes/user/search');

const insertAp = require('./routes/applicant/insert');


Router.post('/loginn', login);
Router.post('/carga', carga); //revisar

Router.get('/guest', guest);
Router.post('/searchGuest', searchGuest);

Router.get('/depas', depa);
Router.post('/upload', upload);
Router.get('/catego', catego);

Router.post('/insertU', insertU);
Router.put('/updateU', updateU);
Router.get('/selectU', selectU);
Router.put('/deleteU', deleteU);
Router.post('/searchU', searchU);

Router.post('/insertAp', insertAp);


module.exports = Router;