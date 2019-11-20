const path = require('path');
const fs = require('fs');
const solc = require('solc');
const chalk = require('chalk');
const contractPath = path.resolve(__dirname,"../contracts","UsersContract.sol");
const source = fs.readFileSync(contractPath,'utf8');

console.log(source);

//const {interface, bytecode} = solc.compile(source, 1).contracts[':UsersContract'];
module.exports = solc.compile(source, 1).contracts[':UsersContract'];//exporta todo el objeto para importarle en otro modulo

//console.log(chalk.green(bytecode));
//console.log(chalk.cyan(interface));