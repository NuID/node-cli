# NuID :: Proving Ground

The NuID Proving Ground provides a docker image test environment for open core
libraries to interact with NuID utilities like [`nuid.zk`](https://github.com/nuid/zk).

## Install

You'll need the [Docker CLI](https://docs.docker.com/get-docker/) installed.
Then build the image and run it.

```sh
make build run
```

## Usage

The proving ground image is useful as an early stage in a multi-stage docker
build. For any open-core library we are building that needs access to the
`nuid.zk` js lib.

Below is an example from the [`nuid/sdk-ruby`](https://github.com/nuid/sdk-ruby)
Dockerfile.

```Dockerfile
# Bring in the proving ground
FROM nuid/proving-ground:latest AS nuid-pg

# Now add the stage to support testing your library
FROM ruby:2.7-alpine
LABEL maintainer="NuID Developers <dev@nuid.io>"
WORKDIR /nuid/sdk-ruby
ADD . .
RUN apk add git
RUN gem install bundler
RUN bundle install

# Be sure to grab the artifacts from the proving ground image
COPY --from=nuid-pg /usr/local/bin/* /usr/local/bin/
RUN rm /usr/local/bin/docker-entrypoint.sh
COPY --from=nuid-pg /usr/bin/nuid-pg /usr/bin/nuid-pg
COPY --from=nuid-pg /nuid /nuid

# etc
ENTRYPOINT "rake test"
```

## Managing the Docker Image

```sh
make build  # Build the docker image
make clean  # Analogous to make stop rm rmi
make rm     # Remove the container
make rmi    # Remove the image
make run    # Start the container
make shell  # Open a shell on the running container
make stop   # Stop the running container
```
