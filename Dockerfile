FROM node:12.14-alpine AS build

WORKDIR /dist/src/app

RUN npm cache clean --force

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist/angular-material-admin /usr/share/nginx/html
EXPOSE 80