#!/bin/bash
#
# WhatIsMyIp-DNS-Server https://github.com/zixia/docker/
#

ARGV=$@

cd /app

if [ 0 -eq ${#@} ]
then
    echo ">> Starting..."
    while true; do
        npm start
        echo ">> Restarting..."
        sleep 1
    done
else
    echo ">> Exec $@ ..."
    exec $@
fi
