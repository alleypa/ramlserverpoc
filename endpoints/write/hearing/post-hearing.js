'use strict';

module.exports = function (router) {

    router.post('/hearing', function (request, response) {
        if (request.body) {

            console.log(JSON.stringify(request.body));

            response.status(200).send(request.body);
            response.end();
        }
    });
};