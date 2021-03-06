// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async (browser) => {
  console.log("Running puppet");
  const page = await browser.newPage();
  await page.goto("https://bot.sannysoft.com");

  //   await browser.close()
  console.log(`All done, exiting puppet`);
});
