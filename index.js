#!/usr/bin/node

var BANNER = " \n\
__        ___           _     _       __  __         ___ ____  \n\
\\ \\      / / |__   __ _| |_  (_)___  |  \\/  |_   _  |_ _|  _ \\ \n\
 \\ \\ /\\ / /| '_ \\ / _` | __| | / __| | |\\/| | | | |  | || |_) |\n\
  \\ V  V / | | | | (_| | |_  | \\__ \\ | |  | | |_| |  | ||  __/ \n\
   \\_/\\_/  |_| |_|\\__,_|\\__| |_|___/ |_|  |_|\\__, | |___|_|    \n\
                                             |___/             \n\
     ____  _   _ ____    ____                            \n\
    |  _ \\| \\ | / ___|  / ___|  ___ _ ____   _____ _ __  \n\
    | | | |  \\| \\___ \\  \\___ \\ / _ \\ '__\\ \\ / / _ \\ '__| \n\
    | |_| | |\\  |___) |  ___) |  __/ |   \\ V /  __/ |    \n\
    |____/|_| \\_|____/  |____/ \\___|_|    \\_/ \\___|_|    \n\
\n\
"

console.log(BANNER)

var dnsd = require('dnsd')

var Logger = require('le_node');
var log = new Logger({
      token:'5a91fefa-a0ea-4e8f-b3a2-a3f6aa1f8b75'
});

var wimi = dnsd.createServer(function(req, res) {
    var queryName   = req.question[0].name
    var queryType   = req.question[0].type
    var queryClass  = req.question[0]['class']
    var remoteAddress = req.connection.remoteAddress

    log.info(remoteAddress + ' ' + queryName)

    console.log(remoteAddress
                + ' ' + queryName
               )
    res.end(remoteAddress)
})

wimi.on('error',function(err){
    switch (true) {
        case /Error processing request/.test(err) :
            console.log(new Date().toISOString()
                        + ' ' + 'Invalid udp package dropped.'
                        + ' ' + err
                       )
            break
        case /EACCES/.test(err) :
            // fallthrough default
        default :
            console.log(new Date().toISOString()
                        + ' Root privilege required. Fatal error: ' + err + '.'
                       )
            process.exit(1)

            break
    }

})

wimi.listen(53, '0.0.0.0')

console.log('WiMI(WhatIsMyIP) DNS Server running at 0.0.0.0:53')
show_help()

function show_help() {
    // http://stackoverflow.com/a/7074687/1123955
    var socket = require('net').createConnection(80, 'www.google.com');
    socket.on('connect', function() {
        console.log('Get my IP by send a DNS Query. i.e.:')
        console.log('  dig @' + socket.address().address + ' WhatIsMyIp')
        socket.end()
    })

    socket.on('error', function(e) {
        console.log('Get my IP by send a DNS Query. i.e.:')
        console.log('  dig @WiMi-dns-server-ip WhatIsMyIp.zixia.net')
	console.log('')
    });


    // generic log method, also accepts JSON entries
    log.log("debug", {sleep:"all night", work:"all day"})

    /*
    http://unix.stackexchange.com/a/81699
    alias wanip='dig +short myip.opendns.com @resolver1.opendns.com'

    hostname -i

   https://github.com/rsp/scripts/blob/master/externalip
    */
}

