const QRCode = require('qrcode')
module.exports = (req, res) => {
    const generateQR = async (text, options) => {
        return await QRCode.toDataURL(text, options)
    }
    const qrcode = async () => {
        let {text, size, margin, dark, light } = req.query;
        return await generateQR(text, {
            width: size,
            margin,
            color: {
                dark,
                light
            }
        })
    }
    let url = await qrcode();
    res.type = 'png'
    res.body = Buffer.from(url.split(',')[1], 'base64')
}