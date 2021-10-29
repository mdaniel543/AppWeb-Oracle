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
const selectHis = require('./routes/applicant/historial');

const selectre = require('./routes/reviewer/select');
const searche = require('./routes/reviewer/search');
const pers = require('./routes/reviewer/pers');

const archivos = require('./routes/reviewer/archivo');
const expedientes = require('./routes/reviewer/expediente');
const historial = require('./routes/reviewer/historial');
const correo = require('./routes/reviewer/correo');

const corregir = require('./routes/applicant/corregir');

const insertPl = require('./routes/coordinator/insert');
const updatePl = require('./routes/coordinator/update');
const selectPl = require('./routes/coordinator/select');
const selectPl2 = require('./routes/coordinator/selectPlani');


Router.post('/insertPl', insertPl);
Router.put('/updatePl', updatePl);
Router.post('/selectPl', selectPl);
Router.post('/selectPl2', selectPl2);


Router.put('/corregir', corregir);

Router.post('/sendcorreo', correo);
Router.post('/pers', pers);
Router.put('/archivos', archivos);
Router.put('/expedientes', expedientes);
Router.post('/historial', historial);

Router.post('/selectHi', selectHis);
Router.post('/selectre', selectre);
Router.post('/searche', searche);

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