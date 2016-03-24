var chalk = require('chalk')

exports.info = function(str){
    console.log(chalk.bgWhite.red("\t<<info>>  " + str + "  "))
}

exports.warn = function(str){
    console.log(chalk.blue.bgYellow("\t<<warn>>  " + str + "  "))
}

exports.err = function(str){
    console.log(chalk.bgRed.white("\t<<error>>  " + str + "  "))
}

exports.print = function(str){
    console.log(chalk.blue(str))
}
