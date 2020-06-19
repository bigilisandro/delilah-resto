const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api')

const app = express();

require('./db.config')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/api', apiRouter)

// settings

app.set('port', process.env.PORT || 3000 );

app.listen(app.get('port'), () => {
    console.log('Servidor inicializaod en puerto', app.get('port'));
});