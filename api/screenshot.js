const puppeteer = require('puppeteer');
const { join } = require('path');
const { tmpdir } = require('os');
const tmpPath = tmpdir();
const chromePath = join(tmpPath, '.local-chromium');
module.exports = async (req, res) => {
    const browserFetcher = puppeteer.createBrowserFetcher({
        path: chromePath,
    })
    const revisionInfo = await browserFetcher.download('818858')
    const { url = "https://vercel-runtimes-api.vercel.app", width = "750px", height = "1334px" } = req.query;
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: revisionInfo.executablePath,
    })
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