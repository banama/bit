var connect = require("connect")
var http = require('http');
var watcher = require('./watcher.js')
var middleware = require('./middleware.js')
var log = require('./utils/log')
var path = require('path')
var request = require('request')
var config = require(path.resolve('bit.js'))
var bit = connect();
var port = 3000

bit.use(function(req, res, next){
    log.info('Start ' + req.url)
    next()
})

config.middleware.forEach(function(midw){
    middleware(bit, midw)
})

bit.use(function(err, req, res, next){
    log.err("There is a error : " + err)
    res.statusCode = 400;
    res.end('Err from Connect!\n');
})

function server(port){
    http.createServer(bit).listen(port, function(a,b,c){
        log.info('Server launch on ' + port)
        cross()
        watcher(launch)
    }).on("error", function(){
        log.err('Server launch error')
        port += 1
        server(port)
    })
}

exports.server = server

function cross(){
    !!bit.scheme && bit.scheme.forEach(function(scheme){
        request.get('http://127.0.0.1:' + port + scheme, function (err, response, body) {
            if(err){
                log.err("Error " + err)
                log.err("Error launch " + scheme)
            }
            else{
                log.info("Finish " + scheme)
            }
        })
    })
}
function launch(){
    !!bit.watchs && bit.watchs.forEach(function(scheme){
        request.get('http://127.0.0.1:' + port + scheme, function (err, response, body) {
            if(err){
                log.err("Error " + err)
                log.err("Error launch " + scheme)
            }
            else{
                log.info("Finish " + scheme)
            }
        })
    })
}
