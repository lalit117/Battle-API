
require('../config/config');

const express = require('express');
const bodyParser = require('body-parser');

const battleRoutes = require('../router/battleRoute');
const {mongoose} = require('../db/mongoose');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', battleRoutes);

let port = process.env.PORT;
app.listen(port, () => {
    console.log('application started on listening on port : ' + port);
});



