'use strict';

const http = require('http');
const docker = require('request');

http.createServer((req, res) => {
  // Write the request to the console which will end up in the Docker logs for this container.
  // The Docker logs are timestamped, so won't bother to add a timestamp here.
  console.log(`${req.socket.address().address} | ${req.method} | ${req.url}`);

  if (req.method === 'GET') {
    docker.get(`http://unix/var/run/docker.sock:${req.url}`)
    .pipe(res);
  } else {
    const code = 401;
    res.writeHead(code, http.STATUS_CODES[code]);
    res.end(`${code} ${http.STATUS_CODES[code]}\r\n\r\n`);
  }
})
.listen(2375);

console.log('Server listening on local port 2375');
