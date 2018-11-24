const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const Handlebars = require('handlebars');
const config = require('../config/defaultConfig');
const mime = require('mime-types');
const compress = require('./compress');
const range = require('../utils/range');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const tplPath = path.join(__dirname, '../templates/');
const dirTplPath = tplPath + 'dir.tpl';

const source = fs.readFileSync(dirTplPath);
const template = Handlebars.compile(source.toString());


module.exports = async (req, res, filePath) => {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const ext = path.extname(filePath).split('.').pop().toLowerCase() || filePath;

      res.statusCode = 200;
      res.setHeader('Content-Type', mime.lookup(ext));
      let rs;

      const {code, start, end} = range(stats.size, req, res);

      if (code === 200) {
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {start, end});
      }

      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

      const dir = path.relative(config.root, filePath);
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files,
      }

      res.end(template(data));
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} is not found`);
  }
};
