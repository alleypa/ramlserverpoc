'use strict';

var app = require('express')(),
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

app.use(logger('dev'));
app.use(errorHandler.init);
//app.use(osprey.server.notFoundHandler);

app.listen(config.scheduling.port, function () {
    console.log('The CSSAPI Raml mock server is running at ' + host + config.scheduling.port);
});
