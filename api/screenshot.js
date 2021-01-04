const { webkit } = require('playwright-webkit');
module.exports = async (req, res) => {
    const { url = "https://baidu.com" } = req.query;
    const browser = await webkit.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    await res.setHeader('content-type', 'application/octet-stream');
    await res.send(Buffer.from(screenshot));
}