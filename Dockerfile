FROM fastbeanau/node-dood

COPY  . /application/

RUN cd /application \
    && npm install --production
