#!/usr/bin/node

var dnsd = require('dnsd')

var wimi = dnsd.createServer(function(req, res) {
    var qeryName    = req.question.name
    var queryType   = req.question.type
    var queryClass  = req.question.class
    var remoteAddress = req.connection.remoteAddress

    console.log(remoteAddress)
    res.end(remoteAddress)
})

wimi.listen(53, '0.0.0.0')

console.log('WiMI DNS Server running at 127.0.0.1:5353')
console.log('WiMI - What is My IP')
show_help()

function show_help() {
    // http://stackoverflow.com/a/7074687/1123955
    var socket = require('net').createConnection(80, 'www.google.com');
    socket.on('connect', function() {
        console.log('Get my IP by send a DNS Query. i.e.:')
        console.log('  dig @' + socket.address().address + ' WhatIsMyIp.zixia.net')
        socket.end()
    })
    socket.on('error', function(e) {
        console.log('Get my IP by send a DNS Query. i.e.:')
        console.log('  dig @WiMi-dns-server-ip WhatIsMyIp.zixia.net')
    });
    /*
    http://unix.stackexchange.com/a/81699
    alias wanip='dig +short myip.opendns.com @resolver1.opendns.com'

    hostname -i

   https://github.com/rsp/scripts/blob/master/externalip
    */
}
