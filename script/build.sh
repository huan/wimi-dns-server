#!/bin/bash

# TAG="tutum.co/zixia/wimi-dns-server"
IMAGE="wimi"

docker build -t $IMAGE . \
    && docker run $IMAGE test
