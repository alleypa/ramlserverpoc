'use strict';

var fs = require('fs'),
    Q = require('q');

module.exports = function () {

    // Supported functionalities
    return{
        read: read
    };    

    ///////////////////////////

    function read(fileName) {

        var readFile = Q.denodeify(fs.readFile),
            deferred = Q.defer();

        readFile(fileName).then(sucess).catch(failed);

        function sucess(data) {
            //return _.attempt(JSON.parse.bind(null, data));

            deferred.resolve(JSON.parse(data));
        }

        function failed (error) {
            deferred.reject('Something went wrong while opening ' + fileName + ' ' + error.message);
        }

        return deferred.promise;
    };
};



//var fs = require('fs');
//var q = require('q');

//function JsonReader() { }

//JsonReader.prototype.read = function (fileName) {

//    var readFile = q.denodeify(fs.readFile);

//    return readFile(fileName)
//        .then(sucess)
//        .catch(function (error) {
//            console.log('Something went wrong while opening ' + fileName + ' ' + error.message);
//        });

//    function sucess(data) {
//        return JSON.parse(data);    
//    }
//};

//module.exports = JsonReader;


