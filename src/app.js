const http = require('http');
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const chalk = require('chalk');
const defaultConf = require('./config/defaultConfig');
const route = require('./utils/route');
const open = require('./utils/open');

class Server {
  constructor (argvConfig) {
    this.conf = Object.assign({}, defaultConf, argvConfig);
  }

  start () {
    const {port, hostname, root} = this.conf;

    const server = http.createServer((req, res) => {
      const filePath = path.join(root, req.url);
      route(req, res, filePath);
    });

    server.listen(port, hostname, () => {
      const address = `http://${hostname}:${port}/`;
      console.info(`已启动，请空中转体720°用电视机打开: ${chalk.green(address)}`);
      open(address);
    });
  }
}

module.exports = Server;
