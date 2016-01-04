'use strict';   

var fs = require('fs'),
    HttpStatus = require('http-status-codes'),
    JsonReader = require(process.cwd() + '/utils/json-reader.js')(),
    path = require('path'),
    ramllint = require('ramllint');

module.exports = function (app, server, options) {

    options.app = app;
    //options.prefix = '/ccs-cst-read';
    options.prioritizeBy = 'example';

    var linter = new ramllint({ url_lower: false });    
    var ramlPath = path.normalize(path.join(path.resolve(options.path), '/scheduling.raml'));
    //console.log(ramlPath);
    linter.lint(ramlPath, function (results) {
        console.log('Lint results');
        console.dir(results);
    });

    var serverRead = server(options, readCallback);

    function readCallback(app) {
        console.log('Get hearing...');

        //'/ccs_cst_read/cpp/cst-read/
        //casehearing/{hearingId}

        app.get('/casehearing', function (request, response) {

            var hearingPath = path.join(__dirname, './data/hearing-found.json');

            if (!fs.existsSync(hearingPath)) {
                return response.status(HttpStatus.NOT_FOUND).send();
            }
            
            JsonReader
                .read(hearingPath)
                .then(function (data) {
                    response.status(HttpStatus.OK).send(data);
                    response.end();
                });
        });

        //serverRead.close(); // stop raml server from watching raml files only
    }
};