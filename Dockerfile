FROM node:12.14-alpine AS build-node
# Create a Virtual directory inside the docker image
WORKDIR /dist/src/app

# Run command in Virtual directory
RUN npm cache clean --force
