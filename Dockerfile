
FROM nginx:latest
WORKDIR /dist/src/app
RUN pwd
RUN ls

COPY /nginx.conf  /etc/nginx/conf.d/default.conf

#RUN chown -R nginx /etc/nginx /var/run /run
#RUN chmod -R a+w /var/run /run /var/cache /var/cache/nginx

COPY /dist/angular-material-admin /usr/share/nginx/html

EXPOSE 3000

USER 100