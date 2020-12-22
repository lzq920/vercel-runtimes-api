const QRCode = require('qrcode')
module.exports = (req, res) => {
    const generateQR = async (text, options) => {
        return await QRCode.toDataURL(text, options)
    }
    const qrcode = async (query) => {
        let { text, size, margin, dark, light } = query;
        return await generateQR(text, {
            width: size,
            margin,
            color: {
                dark,
                light
            }
        })
    }
    let url = await qrcode(req.query);
    res.send(Buffer.from(url.split(',')[1], 'base64'))
}