# docker-ro-api-proxy

A NodeJS based read-only proxy for the [Docker API](https://docs.docker.com/engine/reference/api/docker_remote_api/).

Read-only is achieved by simply blocking all HTTP verbs except for GET, and passing GET requests through to the Docker API's UNIX socket.

__Note:__ this requires [Docker-Node-DooD](https://github.com/fastbean-au/docker-node-dood) or equivalent modifications to be built without it.

The port exposed on the Docker host will be randomly chosen (assuming that _Docker-Node-DooD_ is used).  Thus, instead of using `curl http://192.168.99.100:2375/containers/json` you might rather instead use `curl http://192.168.99.100:32783/containers/json?all=1`