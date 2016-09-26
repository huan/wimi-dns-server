FROM alpine:latest

MAINTAINER Zhuohuan LI <zixia@zixia.net>

WORKDIR /app

RUN apk add --update \
        bash \
        drill \
        nodejs


COPY index.js package.json ./
COPY test /app/test

RUN npm install

COPY entrypoint.sh .
ENTRYPOINT ["./entrypoint.sh"]
CMD ["start"]

EXPOSE 53/udp
