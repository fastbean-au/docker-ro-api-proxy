FROM node-dood-base

COPY  . /application/

RUN cd /application \
    && npm install --production

EXPOSE 2375
