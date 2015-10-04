FROM alpine:latest

MAINTAINER Zhuohuan LI <zixia@zixia.net>

RUN apk add --update \
    bash \
    drill \
    nodejs

WORKDIR /app
COPY index.js /app/
COPY package.json /app/
COPY test/ /app/

RUN npm install

COPY entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
CMD ["start"]

EXPOSE 53
