'use strict';

var app = require('express')(),    
    bodyParser = require('body-parser'),
    errorHandler = require('./utils/error-handler.js')(),
    fs = require('fs'),
    host = 'http://localhost:' || '', // TODO: make dynamic
    logger = require('morgan'),
    osprey = require('osprey'),
    path = require('path'),
    yamlConfig = require('node-yaml-config');    
    

var config = yamlConfig.load(path.join(__dirname, '/config/config.yml'));

if (!fs.existsSync(path.join(__dirname, config.scheduling.path))) {
    throw new Error('Project path ' + config.scheduling.path + ' does not exist');
}

var ramlPath = path.normalize(path.join(__dirname, config.scheduling.path, 'scheduling.raml'));
var router = osprey.Router();

//console.dir(osprey);
osprey.loadFile(ramlPath).then(function (middleware) {

    app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
    app.use(bodyParser.json()); // application/json
    app.use(logger('dev'));
    app.use('', middleware, router);
    app.use(errorHandler.init);

    app.listen(config.scheduling.port, function () {
        console.log('The CSSAPI Raml mock server is running at ' + host + config.scheduling.port);
    });
});

router.get('/ccs-cst-read/casehearing/{hearingid}', function (request, response) {

    response.status(200).send('data sent...');
    response.end();
});

router.post('/ccs-cst-write/hearing', function (request, response) {
    if (request.body) {

        console.log(JSON.stringify(request.body));

        response.status(200).send(request.body);
        response.end();
    }
});



// load all endpoints
//require('./endpoints/hearing')(app, osprey);

