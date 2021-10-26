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
const selectPr = require('./routes/applicant/select');
const requisitos = require('./routes/applicant/requisitos');
const updateAp = require('./routes/applicant/update');

const selectAp = require('./routes/recruiter/select');
const depas = require('./routes/recruiter/depa');
const puestos = require('./routes/recruiter/puesto');
const searchAp = require('./routes/recruiter/search');
const apto = require('./routes/recruiter/apto');
const controller = require('./routes/recruiter/sendCV');
const controller2 = require('./routes/applicant/send');
const uploadAr = require('./routes/applicant/uploadExp');

const archivo = require('./routes/applicant/archivo');
const selectExp = require('./routes/applicant/selectExp');
const primera = require('./routes/applicant/primera')

Router.put('/primera', primera);
Router.post('/archivo', archivo);
Router.post('/selectExp', selectExp);

Router.post('/controller', controller);
Router.post('/controller2', controller2);

Router.post('/depasr', depas);
Router.post('/puestos', puestos);
Router.post('/selectAp', selectAp);
Router.put('/updateAp', updateAp);

Router.post('/searchAp', searchAp);
Router.put('/apto', apto);

Router.post('/loginn', login);
Router.post('/carga', carga); //revisar

Router.get('/guest', guest);
Router.post('/searchGuest', searchGuest);

Router.get('/depas', depa);
Router.post('/upload', upload);
Router.post('/uploadExp', uploadAr);

Router.get('/catego', catego);

Router.post('/insertU', insertU);
Router.put('/updateU', updateU);
Router.get('/selectU', selectU);
Router.put('/deleteU', deleteU);
Router.post('/searchU', searchU);

Router.post('/insertAp', insertAp);
Router.post('/requisitos', requisitos);
Router.post('/selectPr', selectPr);

module.exports = Router;