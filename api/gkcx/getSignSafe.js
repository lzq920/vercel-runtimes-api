const CryptoJS = require("crypto-js")
module.exports = async (req, res) => {
    let str = req.params.url;
    str = CryptoJS.HmacSHA1(CryptoJS.enc.Utf8.parse(str), "D23ABC@#56");
    str = CryptoJS.enc.Base64.stringify(str).toString();
    str = CryptoJS.MD5(str).toString();
    res.send({
        signSafe: str
    });
}