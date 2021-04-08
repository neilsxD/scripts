const puppeteer = require("puppeteer");
const fs = require("fs");
const config = require("./config.json");
const cookies = require("./cookies.json");
(async () => {
  console.log("Hello World");
  let browser = await puppeteer.launch({ headless: false });
  const context = browser.defaultBrowserContext();
  context.overridePermissions("https://www.facebook.com", []);

  let page = await browser.newPage();
  await page.setDefaultNavigationTimeout(100000);
  await page.setViewport({ width: 1200, height: 800 });

  if (!Object.keys(cookies).length) {
    await page.goto("https://www.facebook.com/login", {
      waitUntil: "networkidle2",
    });
    await page.type("#email", config.username, { delay: 30 });
    await page.type("#pass", config.password, { delay: 30 });
    await page.click("#loginbutton");
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.waitForTimeout(15000);
    try {
      await page.waitForTimeout('[data-click="profile_icon"]');
    } catch (err) {
      console.log("failed to login");
      //   process.exit(0);
    }
    let currentCookies = await page.cookies();
    fs.writeFileSync("./cookies.json", JSON.stringify(currentCookies));
  } else {
    await page.setCookie(...cookies);
    await page.goto("https://www.facebook.com/micdroptoastmasters", {
      waitUntil: "networkidle2",
    });
  }
})();
