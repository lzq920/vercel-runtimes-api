const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
module.exports = async (req, res) => {
    const { url = "https://vercel-runtimes-api.vercel.app", width = "750px", height = "1334px" } = req.query;
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
        defaultViewport: {
            width: width,
            height: height
        }
    });
    const page = await browser.newPage();
    await page.setViewport({
        width,
        height
    });
    await page.goto(url, { waitUntil: 'networkidle0' });
    const screenshot = await page.screenshot();
    await browser.close();
    res.setHeader('content-type', 'application/octet-stream');
    res.send(Buffer.from(screenshot));
}