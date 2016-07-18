# docker-ro-api-proxy

A NodeJS based read-only proxy for the Docker API.

Read-only is achieved by simply blocking all HTTP verbs except for GET, and passing GET requests through to the Docker API's UNIX socket.