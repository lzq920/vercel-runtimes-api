const CryptoJS = require("crypto-js")
const index = async (req, res) => {
    const { w, data } = req.body;
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
        ciphertext: CryptoJS.enc.Hex.parse(data)
    })
    let B = CryptoJS.AES.decrypt(H, CryptoJS.enc.Hex.parse(P), {
        iv: CryptoJS.enc.Hex.parse(Q)
    })
    res.send({
        data: JSON.parse(B.toString(CryptoJS.enc.Utf8))
    })
}
module.exports = index
