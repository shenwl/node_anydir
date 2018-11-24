module.exports = {
  hostname: '127.0.0.1',
  port: process.env.PORT || 2333,
  root: process.cwd(),
  compress: /\.(html|js|css|md|json)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
};
