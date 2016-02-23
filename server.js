var restify = require('restify');

var Package = require('./package.json');

// rather than hardcode the name and version, just pull it out of package.json :)
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

// set the default charset is UTF-8, saving us from having to set it in every route
server.pre(function(request, response, next) {
    response.charSet('utf-8');

    return next();
});

// api/index.js will include all of our API routes
require('./src/api')(server);

// we need to allow a port override in deployments using env vars
var port = process.env.PORT || 3000;

// this defaults to localhost, but need it to be null in production
var host = process.env.HOST || null;

console.log('PORTS', port, process.env.PORT);

// let's go!
server.listen(port, function() {
    console.log('%s running Restify server on port %s', server.name, port);
});
