
FROM nginx:latest AS ngi
WORKDIR /dist/src/app
RUN pwd
RUN cd /dist/src/app && ls;

COPY /dist/src/app/nginx.conf  /etc/nginx/conf.d/default.conf

RUN chown -R nginx /etc/nginx /var/run /run
RUN chmod -R a+w /var/run /run /var/cache /var/cache/nginx

COPY /dist/src/app/dist/angular-material-admin /usr/share/nginx/html

EXPOSE 80

USER 100