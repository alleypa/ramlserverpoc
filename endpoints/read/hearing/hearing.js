'use strict';

var fs = require('fs'),
    HttpStatus = require('http-status-codes'),
    JsonReader = require(process.cwd() + '/utils/json-reader.js')(),
    path = require('path');

module.exports = function (router) {

    router.get('/casehearing/{hearingid}', function (request, response) {

        var hearingPath = path.join(__dirname, './data/hearing-found.json');

        if (!fs.existsSync(hearingPath)) {
            return response.status(HttpStatus.NOT_FOUND).send();
        }

        JsonReader
            .read(hearingPath)
            .then(function (data) {
                response.status(HttpStatus.OK).send(data);
            })
            .catch(function (error) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
            })
            .finally(function () {
                response.end();
            });        
    });
};