const childProcess = require('child_process');
const process = require('process');

module.exports = (url) => {
  let cmd = 'open'
  if (process.platform == 'wind32') {
    cmd = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"';
  } else if (process.platform == 'linux') {
    cmd = 'xdg-open';
  }
  childProcess.exec(`${cmd} ${url}`);
}
