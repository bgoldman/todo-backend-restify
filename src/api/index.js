module.exports = function(api) {
    require('./todos')(api);

    api.get('/', function(request, response, next) {
        response.send({
            message: 'All your todos are belong to us.'
        });
        next();
    });
};
