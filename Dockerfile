FROM alpine:latest

MAINTAINER Zhuohuan LI <zixia@zixia.net> https://github.com/zixia

COPY entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
CMD ["--help"]

WORKDIR /app

RUN apk add --update \
    bash \
    nodejs

EXPOSE 53

COPY index.js /app/
COPY package.json /app/
COPY test /app/

RUN npm install
