const http = require("http");
const url = require("url");
module.export = (req, res) => {
  function getCurrentDateInYYYYMMDD() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
  const date = getCurrentDateInYYYYMMDD();
  const targetUrl = `https://free.datiya.com/uploads/${date}-clash.yaml`;
  const parsedUrl = url.parse(aAddress);
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || 80,
            path: parsedUrl.path,
            method: 'GET',
            headers: req.headers
        };

        // 向 A 地址发起请求
        const proxyReq = http.request(options, (proxyRes) => {
            // 将 A 地址的响应头设置到客户端的响应头
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            // 将 A 地址的文件流转发给客户端
            proxyRes.pipe(res);
        });

        // 处理请求错误
        proxyReq.on('error', (err) => {
            console.error('Error proxying request:', err);
            res.status(500).send('Error proxying request');
        });

        // 结束请求
        proxyReq.end();

}
