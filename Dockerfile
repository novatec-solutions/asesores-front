FROM node:12.14-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /dist/src/app