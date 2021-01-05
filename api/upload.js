module.export = (req, res) => {
    const accessKey = process.env.accessKey;
    const secretKey = process.env.secretKey;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
        scope: process.env.bucket,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    res.send({token:uploadToken});
}