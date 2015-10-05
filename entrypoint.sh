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
        node index.js
        sleep 1
        echo ">> Restarting..."
    done
elif [ "test" == "$1" ]
then
    node index.js &

    n=0
    while [ "`netstat -nlu | grep ':53 ' | wc -l`" -eq 0 ] 
    do
        [ $n -gt 30 ] && {
            echo '>> Network error, exiting.'
            exit 1
        }

        echo ">> Waiting server up... $n"
        ((n++))
        sleep 1
    done

    echo '>> Starting test...'
    exec npm test
else
    echo ">> Exec $@ ..."
    exec $@
fi

echo "Ahhh!? what happened??"
