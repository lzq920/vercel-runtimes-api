const QRCode = require('qrcode')
module.exports = (req, res) => {
    const { text } = req.query;
    QRCode.toDataURL(text, function (err, url) {
        res.send(url);
    });
}