// 
//
// 

var tap = require('tap')
var test = tap.test

var dgram = require('dgram')

var PORT = 5321

test('Get 127.0.0.1 from localhost', function(t) {

    var exec = require('child_process').exec;
    var cmd = 'dig +short whatismyip @127.0.0.1'

    exec(cmd, function(error, stdout, stderr) {
        t.equal(stdout, '127.0.0.1\n', 'dig return 127.0.0.1')
        t.end()
    })
})


