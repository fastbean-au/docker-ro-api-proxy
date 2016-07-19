'use strict';

const http = require('http');
const docker = require('request');

const validPaths = /^\/(_ping|containers|events|exec|images|info|networks|nodes|services|tasks|version|volumes)([\/\?]|$)/i;

function endWithStatus(res, code) {
  res.writeHead(code, http.STATUS_CODES[code]);
  res.end(`${code} ${http.STATUS_CODES[code]}\r\n\r\n`);
}

// -------------------------------------------------------------------------------------------------
// Initialise the HTTP server
// -------------------------------------------------------------------------------------------------

http.createServer((req, res) => {
  // Write the request to the console which will end up in the Docker logs for this container.
  // The Docker logs are timestamped, so won't bother to add a timestamp here.
  console.log(`${req.socket.address().address} | ${req.method} | ${req.url}`);

  if (req.method === 'GET') {
    if (req.url.match(validPaths)) {
      docker.get(`http://unix/var/run/docker.sock:${req.url}`)
      .pipe(res);
    } else {
      endWithStatus(res, 404);
    }
  } else {
    endWithStatus(res, 401);
  }
})
.listen(2375);

console.log('Server listening on local port 2375');
