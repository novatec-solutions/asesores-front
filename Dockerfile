#Primera Etapa
FROM node:14 as build

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/angular-material-admin /usr/share/nginx/html