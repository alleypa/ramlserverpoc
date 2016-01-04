'use strict';

module.exports = function (app, server, options) {
    return {
        getHearing: require('./get-hearing.js')(app, server, options)
    };
};