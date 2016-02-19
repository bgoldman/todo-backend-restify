var restify = require('restify');

var Package = require('./package.json');

var server = restify.createServer({
    name:    Package.name,
    version: Package.version
});

// cleans up the URLs to remove slash multiples and removes trialing slashes
server.pre(restify.pre.sanitizePath());

// sends "Connection: Close" for HEAD requests
server.pre(restify.pre.userAgentConnection());

// will respond to all acceptable requested HTTP content types
server.use(restify.acceptParser(server.acceptable));

// parses the request body into request.body, based on JSON, regular form data, and multipart form data
server.use(restify.bodyParser());

// supports Cross-Origin Resource Sharing
server.use(restify.CORS());

// gzips the response if the client accepts it
server.use(restify.gzipResponse());

// parses the query string into request.query
server.use(restify.queryParser());

// serves static documents from the `/public` directory
server.get(/\/static\/?.*/, restify.serveStatic({ directory: './public' }));

server.pre(function(request, response, next) {
    response.charSet('utf-8');
    return next();
});

require('./src/api')(server);

var port = process.env.PORT || 3000;
var host = process.env.HOST || '127.0.0.1';

server.listen(port, host, function() {
    console.log('%s running Restify server at %s', server.name, server.url);
});
