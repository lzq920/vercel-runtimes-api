const qiniu = require("qiniu");
module.exports = (req, res) => {
    const { key } = req.query;
    if (key && key === process.env.key) {
        const accessKey = process.env.accessKey;
        const secretKey = process.env.secretKey;
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const options = {
            scope: process.env.bucket,
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        res.send({ token: uploadToken });
    }else{
        res.status = 400;
        res.send({
            message:"缺少key或者key错误"
        });
    }
}