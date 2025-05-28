
const puppeteer = require("puppeteer-core");

async function scrapeIMDB(url) {
  const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});


  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
  );

  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });

  await page.waitForSelector("h1", { timeout: 10000 }).catch(() => {});

  const data = await page.evaluate(() => {
    const title = document.querySelector("h1")?.innerText.trim() || "N/A";
    const rating =
      document.querySelector('[data-testid="hero-rating-bar__aggregate-rating__score"] span')
        ?.innerText || "N/A";
    const genres = Array.from(
      document.querySelectorAll('[data-testid="genres"] a')
    ).map((el) => el.innerText);
    const summary =
      document.querySelector('[data-testid="plot-xl"]')?.innerText || "N/A";

    return { title, rating, genres, summary };
  });

  await browser.close();
  return data;
}

module.exports = scrapeIMDB;
