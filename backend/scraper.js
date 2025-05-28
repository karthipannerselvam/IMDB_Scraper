const express = require("express");
const router = express.Router();
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

router.post("/scrape", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Sample scraping logic
    const data = await page.evaluate(() => {
      return {
        title: document.querySelector("h1")?.innerText || "N/A",
        rating:
          document.querySelector(
            '[data-testid="hero-rating-bar__aggregate-rating__score"] span'
          )?.innerText || "N/A",
        summary:
          document.querySelector('[data-testid="plot"] > span')?.innerText ||
          "N/A",
        genres: Array.from(
          document.querySelectorAll('[data-testid="genres"] a')
        ).map((a) => a.innerText),
      };
    });

    await browser.close();

    // Save to DB (if applicable) or return
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed" });
  }
});

module.exports = router;
