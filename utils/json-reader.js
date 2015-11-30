'use strict';

var fs = require('fs'),
    q = require('q');

module.exports = function () {

    // Supported functionalities
    return{
        read: read
    };    

    ///////////////////////////

    function read(fileName) {

        var readFile = q.denodeify(fs.readFile);

        return readFile(fileName)
            .then(sucess)
            .catch(function (error) {
                console.log('Something went wrong while opening ' + fileName + ' ' + error.message);
            });

        function sucess(data) {
            return JSON.parse(data);
        }
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


