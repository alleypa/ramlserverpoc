'use strict';

var app = require('express')(),
    fs = require('fs'),
    path = require('path'),
    ramlServer = require('raml-mocker-server'),
    yamlConfig = require('node-yaml-config'),    
    morgan = require('morgan');

var config = yamlConfig.load(path.join(__dirname, '/config/config.yml'));

if (!fs.existsSync(path.join(__dirname, config.scheduling.path))) {
    throw new Error('Project path ' + config.scheduling.path + ' does not exist');
}

var optionsRead = {
    //app: app,
    debug: true,
    port: config.scheduling.port,
    path: path.resolve(config.scheduling.path, 'scheduling_cst_read.raml'),
    watch: true
}

var cb = function () {
    console.log('callback, stop the server');
};

var serverRead = ramlServer(optionsRead, cb);

console.dir(serverRead);
//Logging middleware
//serverRead.use(morgan('dev'));

//serverRead.listen(config.scheduling.port, function () {
//    console.log('The CSSAPI Raml mockserver is now running at http://localhost:8888');
//});