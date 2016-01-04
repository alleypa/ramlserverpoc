'use strict';

var app = require('express')(),    
    bodyParser = require('body-parser'),
    compress = require('compression'),
    errorHandler = require('./utils/error-handler.js')(),
    fs = require('fs'),
    host = 'http://localhost:' || '', // TODO: make dynamic
    logger = require('morgan'),
    path = require('path'),
    ramlServer = require('raml-mocker-server'),
    yamlConfig = require('node-yaml-config');    
    

var config = yamlConfig.load(path.join(__dirname, '/config/config.yml'));

if (!fs.existsSync(path.join(__dirname, config.scheduling.path))) {
    throw new Error('Project path ' + config.scheduling.path + ' does not exist');
}

app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(errorHandler.init);

var options = {
    debug: true,
    port: config.scheduling.port,
    path: config.scheduling.path,
    watch: true
};

// load all endpoints
require('./endpoints/hearing')(app, ramlServer, options);

app.listen(config.scheduling.port, function () {
    console.log('The CSSAPI Raml mock server is running at ' + host + config.scheduling.port);
});