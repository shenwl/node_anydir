const http = require('http');
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const chalk = require('chalk');
const conf = require('./config/defaultConfig');
const route = require('./utils/route');
const open = require('./utils/open');


const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url);
  route(req, res, filePath);
})

server.listen(conf.port, conf.hostname, () => {
  const address = `http://${conf.hostname}:${conf.port}/`

  console.info(`Server running at ${chalk.green(address)}`);
  open(address)
})
