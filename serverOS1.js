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
var ramlDir = path.join(__dirname, config.scheduling.path);

if (!fs.existsSync(ramlDir)) {
    throw new Error('Project path ' + config.scheduling.path + ' does not exist');
}

app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(logger('dev'));
//app.use(osprey.server.notFoundHandler)
app.use(errorHandler.init);

var options = {
    app: app,
    dir: ramlDir,
    server: {
        cors: true,
        compression: true,
        notFoundHandler: false
    }
};

// load endpoints for read and write
require('./endpoints/read')(osprey, options);
require('./endpoints/write')(osprey, options);


app.listen(config.scheduling.port, function () {
    console.log('The CSSAPI Raml mock server is running at ' + host + config.scheduling.port);
});
