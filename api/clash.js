const http = require("http");
module.export = function(){
function getCurrentDateInYYYYMMDD() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
  const date = getCurrentDateInYYYYMMDD();
  const targetUrl = `https://free.datiya.com/uploads/${date}-clash.yaml`;
  http.get(targetUrl, (targetRes) => {
        // 设置响应头，将目标资源的响应头复制到客户端响应头
        res.writeHead(targetRes.statusCode, targetRes.headers);
        // 将目标资源的响应数据转发给客户端
        targetRes.pipe(res);
    }).on('error', (err) => {
        // 错误处理
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
    });

}
