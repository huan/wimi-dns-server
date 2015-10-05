#!/bin/bash

TAG="tutum.co/zixia/wimi-dns-server"

docker build -t $TAG . \
    && docker run $TAG test \
    && docker push $TAG
