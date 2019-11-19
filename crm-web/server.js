const http = require('http'),
  fs = require('fs'),
  url = require('url'),
  path = require('path'),
  httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
proxy.on('error', function(e) {
  console.error('proxy error!', e);
});

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  // 获取解析后的url对象
  const pathObj = url.parse(req.url, true);
	  
   // 后台api
  if (!/\.(js|html|css|jpg|ico|png|svg|woff2)$/.test(pathObj.pathname)) {
    proxy.web(req, res, { target: 'http://127.0.0.1:8080' });
    return;
  }
  // 资源路径
  const filePath = path.join(__dirname, "./html" + pathObj.pathname);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.error('404');
      res.end('<h1>404 not found</h1>');
    } else {
      // 二进制
      res.write(file, 'binary');
      res.end();
    }
  });
});

server.listen(port);
console.log(`server start on ${port}`);