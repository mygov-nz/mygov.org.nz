FROM node:12-alpine

RUN set -ex; \
    apk add --no-cache tini; \
    mkdir -p /usr/src/app; \
    chown node:node /usr/src/app; \
    rm -r /opt/yarn-* /usr/local/bin/yarn*;
USER node
ENV NODE_ENV development
WORKDIR /usr/src/app
ENTRYPOINT [ "tini", "--" ]
CMD [ "npm", "start" ]
