const spawn = require('child_process').spawn;
const log = require('./utils/log')

module.exports = function command(cmd, next){
    const exec =  (function(){
        var cmdAry = cmd.split(" ")
        return spawn(cmdAry[0], cmdAry.slice(1));
    })();

    exec.stdout.on('data', (data) => {
        log.print(`${data}`);
    })

    exec.stderr.on('data', (data) => {
        log.err(`${data}`);
    });

    exec.on('close', (code) => {
        console.log("command close")
        next()
    });
}

