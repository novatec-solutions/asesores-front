
FROM nginx:latest AS ngi
RUN ls
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80