const CryptoJS = require("crypto-js")
const index = async (req, res) => {
    let str = req.params.url;
    str = CryptoJS.HmacSHA1(CryptoJS.enc.Utf8.parse(str), "D23ABC@#56");
    str = CryptoJS.enc.Base64.stringify(str).toString();
    str = CryptoJS.MD5(str).toString();
    res.send({
        signSafe: str
    });
}
module.exports = index
