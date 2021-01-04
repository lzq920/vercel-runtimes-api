const {
    webkit,
    devices
} = require('playwright-webkit');
const iPhone = devices['iPhone 6'];
module.exports = async (req, res) => {
    const { url = "https://baidu.com"} = req.query;
    const browser = await webkit.launch();
    const context = await browser.newContext({
        ...iPhone,
        permissions: ['geolocation'],
        geolocation: {
            latitude: 52.52,
            longitude: 13.39
        },
        colorScheme: 'dark',
        locale: 'de-DE'
    });
    const page = await context.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    res.setHeader('content-type', 'application/octet-stream');
    res.send(Buffer.from(screenshot));
}