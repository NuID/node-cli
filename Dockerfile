FROM node:lts-alpine3.10
LABEL maintainer="NuID Developers <dev@nuid.io>"
WORKDIR /nuid/proving-ground
ADD . .
RUN ln -s /nuid/proving-ground/bin/nuid-pg /usr/bin/nuid-pg
RUN npm install
ENTRYPOINT []
CMD ["/bin/sh"]
