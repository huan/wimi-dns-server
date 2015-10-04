// 
//
// 

var tap = require('tap')
var test = tap.test

var dgram = require('dgram')

var PORT = 5321

test('Get 127.0.0.1 from localhost', function(t) {

    var exec = require('child_process').exec;
    //var cmd = 'dig +short whatismyip @127.0.0.1'
    var cmd = "drill WhatIsMyIP @127.0.0.1 | grep -v ^\\; | grep -v ^$ | grep WhatIsMyIP | awk '{print $5}'"

    exec(cmd, function(error, stdout, stderr) {
        t.equal(stdout, '127.0.0.1\n', 'server return 127.0.0.1')
        t.end()
    })
})


