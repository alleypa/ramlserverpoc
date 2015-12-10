'use strict';

var app = require('express')(),
    errorHandler = require('./utils/error-handler.js')(),
    fs = require('fs'),
    host = 'http://localhost:' || '', // TODO: make dynamic
    logger = require('morgan'),
    osprey = require('osprey'),
    path = require('path'),
    Q = require('q'),
    yamlConfig = require('node-yaml-config');    
    

var config = yamlConfig.load(path.join(__dirname, '/config/config.yml'));
var ramlDir = path.join(__dirname, config.scheduling.path);

if (!fs.existsSync(ramlDir)) {
    throw new Error('Project path ' + config.scheduling.path + ' does not exist');
}

var options = {
    server: {
        cors: true,
        compression: true,
        notFoundHandler: false
    }
};

var readRaml = ramlDir + '/ccs-cst-read.raml';
var writeRaml = ramlDir + '/ccs_cst_write.raml';
var router = osprey.Router();

Q.all([
    osprey.loadFile(readRaml, options),
    osprey.loadFile(writeRaml, options)
])
.then(function (middlewares) {
    app.use(middlewares[0], middlewares[1], router);
    //app.use(mountMiddlewares(middlewares), router);
    app.use(logger('dev'));
    app.use(errorHandler.init);
    app.use(osprey.server.notFoundHandler);

    app.listen(config.scheduling.port, function () {
        console.log('The CSSAPI Raml mock server is running at ' + host + config.scheduling.port);
    });
})
.finally(function () {

    // load endpoints for read and write
    require('./endpoints/read')(router);
    require('./endpoints/write')(router);
});

function mountMiddlewares(middlewares) {
    middlewares.forEach(function (middleware) {
        return middleware;
    });
}




