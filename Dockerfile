FROM fastbeanau/node-dood

COPY  . /application/

RUN cd /application \
    && npm install --production

EXPOSE 2375
