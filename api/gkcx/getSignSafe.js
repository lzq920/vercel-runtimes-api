const CryptoJS = require("crypto-js")
const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}
const index = async (req, res) => {
    let str = req.params.url;
    str = CryptoJS.HmacSHA1(CryptoJS.enc.Utf8.parse(str), "D23ABC@#56");
    str = CryptoJS.enc.Base64.stringify(str).toString();
    str = CryptoJS.MD5(str).toString();
    res.send({
        signSafe: str
    });
}
module.exports = allowCors(index)