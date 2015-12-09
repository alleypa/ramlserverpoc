'use strict';

module.exports = function (osprey, options) {

    var readRaml = require('path').normalize(options.dir + '/ccs-cst-read.raml');
    var app = options.app;
    var router = osprey.Router();

    osprey.loadFile(readRaml, options).then(function (middleware) {

        app.use('', middleware, router);
        

        require('./hearing/hearing.js')(router);        
    });
};