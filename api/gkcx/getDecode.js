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
    const { w, data } = req.params;
    let str = data;
    let w = w;
    let P = CryptoJS.PBKDF2("D23ABC@#56", "secret", {
        keySize: 8,
        iterations: 1e3,
        hasher: CryptoJS.algo.SHA256
    }).toString()
    let Q = CryptoJS.PBKDF2(w, "secret", {
        keySize: 4,
        iterations: 1e3,
        hasher: CryptoJS.algo.SHA256
    }).toString()
    let H = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Hex.parse(str)
    })
    let B = CryptoJS.AES.decrypt(H, CryptoJS.enc.Hex.parse(P), {
        iv: CryptoJS.enc.Hex.parse(Q)
    })
    res.send({
        data: JSON.parse(B.toString(CryptoJS.enc.Utf8))
    })
}
module.exports = allowCors(index)