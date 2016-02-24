import config  from 'config';
import restify from 'restify';

import Package from './package.json';

import API      from './src/api';
import Database from './src/lib/database';

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
server.use(restify.fullResponse());

// gzips the response if the client accepts it
server.use(restify.gzipResponse());

// parses the query string into request.query
server.use(restify.queryParser());

// serves static documents from the `/public` directory
server.get(/\/static\/?.*/, restify.serveStatic({ directory: './public' }));

// set the default charset to UTF-8 and the default content-type to json,
// saving us from having to set it in every route
server.pre(function(request, response, next) {
    response.contentType = 'json';
    response.charSet('utf-8');
    next();
});

// pass the server instance to api/index.js will include all of our API routes
API(server);

// we need to allow a port override in deployments using env vars
var port = config.get('server.port');

// connect to the database and launch the app!
console.log('Connecting to database...');

Database.connect().then(function() {
    console.log('    ...connected to database.');
    console.log('Starting Restify server...');

    server.listen(port, function() {
        console.log('    ...%s running Restify server on port %s', server.name, port);
    });
});
