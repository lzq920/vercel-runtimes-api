const QRCode = require('qrcode')
module.exports = async (req, res) => {
    const generateQR = async (text, options) => {
        return await QRCode.toDataURL(text, options)
    }
    const qrCode = async (query) => {
        let { text = "https://vercel-runtimes-api.vercel.app", size, margin, dark, light } = query;
        return await generateQR(text, {
            width: size,
            margin,
            color: {
                dark,
                light
            }
        })
    }
    let url = await qrCode(req.query);
    res.setHeader('content-type', 'application/octet-stream');
    res.send(Buffer.from(url.split(',')[1], 'base64'));
}