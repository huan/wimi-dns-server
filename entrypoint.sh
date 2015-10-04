#!/bin/bash
#
# WhatIsMyIp-DNS-Server https://github.com/zixia/docker/
#

ARGV=$@

echo ">> Starting..."
cd /app

if [ 0 -eq ${#@} ] || [ "start" == "$1" ]
then
    while true; do
        npm start
        sleep 1
        echo ">> Restarting..."
    done
elif [ "test" == "$1" ]
then
    exec npm test
else
    echo ">> Exec $@ ..."
    exec $@
fi

echo "Ahhh!? what happened??"
