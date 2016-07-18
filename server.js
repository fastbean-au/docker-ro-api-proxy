'use strict';

const express = require('express');
const http = require('http');
const cors = require('cors');
const docker = require('request');

// The supported calls to the Docker API - it's not necessary to do this, really, and it does create
// a dependency on the version of the Docker host.
const validRoutes = {
  _ping: true,
  containers: true,
  events: true,
  exec: true,
  images: true,
  info: true,
  networks: true,
  nodes: true,
  services: true,
  tasks: true,
  version: true,
  volumes: true,
};

// -------------------------------------------------------------------------------------------------
// Docker request
// -------------------------------------------------------------------------------------------------

// Note: this does not accept (and thus does not call) a next middleware.
function dockerRequest(req, res) {
  // Write the request to the console which will end up in the Docker logs for this container.
  console.log(`${req.ip}: ${req.originalUrl}`);

  docker.get(`http://unix/var/run/docker.sock:${req.originalUrl}`)
  .pipe(res);
}

// -------------------------------------------------------------------------------------------------
// URL route validation - ensure that the requested command is supported.
// -------------------------------------------------------------------------------------------------
function validateRoute(req, res, next) {
  // Only fire the next middleware if the route is valid.
  if (! validRoutes.hasOwnProperty(req.params.route.toLowerCase())) {
    res.sendStatus(404);
  } else {
    next();
  }
}

// -------------------------------------------------------------------------------------------------
// Initialise the HTTP server
// -------------------------------------------------------------------------------------------------

const app = express();

// Set the port to the default Docker API port - we'll let the instantiator of the image determine
// any required port mappings.
app.set('port', 2375);

// Allow cross-site
app.use(cors());

app.get('/:route', (req, res, next) => validateRoute(req, res, next));

app.get('*', (req, res) => dockerRequest(req, res));

// -------------------------------------------------------------------------------------------------
// Send a 401 (unauthorised) for everything else (i.e. all other HTTP verbs).
app.use((req, res) => {
  res.sendStatus(401);
});

http.createServer(app).listen(app.get('port'));
