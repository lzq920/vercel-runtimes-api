const playwright = require("playwright-aws-lambda");
module.exports = async (req, res) => {
  let browser = null;
  const { url } = req.query;
  try {
    if (url && isValidUrl(url)) {
      browser = await playwright.launchChromium({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(url);
      const screenshot = await page.screenshot({ type: "png" });
      res.setHeader("Content-Type", "image/png");
      res.status(200).send(screenshot);
    } else throw "Please provide a valid url";
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      error
    });

  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

};

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
}