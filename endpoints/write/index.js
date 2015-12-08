'use strict';

module.exports = function (osprey, options) {

    var writeRaml = require('path').normalize(options.dir + '/ccs_cst_write.raml');

    var app = options.app;
    var router = osprey.Router();

    osprey.loadFile(writeRaml, options).then(function (middleware) {
        app.use('', middleware, router);

        require('./hearing/post-hearing.js')(router);
    });
};


