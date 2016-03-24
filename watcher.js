var path = require('path');
var chokidar = require('chokidar');
module.exports = function watcher(cb){
    chokidar.watch('.', {
        ignored: /[\/\\]\./
    }).on('change', (event, path) => {
        cb();
    });
}
