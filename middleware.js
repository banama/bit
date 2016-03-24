var command = require('./command.js')
var log = require('./utils/log')
module.exports = function middleware(bit, middle){

    var middlewareWrap = function(m){
        if(typeof m === 'string'){
            return function(req, res, next){
                command(m, function(){
                    next();
                })
            }
        }
        else if(typeof m === 'function'){
            return function(req, res, next){
                m(next)
            }
        }
        else{
            log.warn('Wrong middleware ' + middle.scheme)
        }
    }
    var scheme = middle.scheme[0] != '/' ? '/' + middle.scheme : middle.scheme
    bit.scheme = !!bit.scheme ? bit.scheme : bit.scheme = []
    bit.scheme.push(scheme)

    middle.middleware.forEach(function(func){
        bit.stack.push({
            route: scheme,
            handle: middlewareWrap(func)
        })
    })

    if(middle.watch){
       if(!!bit.watchs) {
           bit.watchs.push(scheme)
       }
       else{
           bit.watchs = []
           bit.watchs.push(scheme)
       }
    }

    return this
}
