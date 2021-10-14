const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//imports
const Routes = require('./routes');

//settings
app.set('port', 5000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(Routes);

//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 5000')
})
