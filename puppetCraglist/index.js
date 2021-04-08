const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const chalk = require("chalk");
const { bgGray } = require("chalk");

async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://accounts.craigslist.org/login");

    // await page.waitForSelector(".login-page-boxes #inputEmailHandle");
    await page.type(
      ".login-page-boxes #inputEmailHandle",
      "rendomzz22@gmail.com",
      { delay: 20 }
    );

    // await page.waitForSelector(".login-page-boxes #inputPassword");
    await page.type(".login-page-boxes #inputPassword", "neelansh@123");

    // await page.waitForSelector(".login-page-boxes #login");
    await page.click(".login-page-boxes #login");

    await page.waitForSelector(
      ".page-container > .account-header > .tabcontainer "
    );

    await page.goto(
      "https://accounts.craigslist.org/login/home?show_tab=billing"
    );

    const content = await page.content();
    const $ = await cheerio.load(content);
    console.log(
      chalk.bgGrey($("body > article > section > fieldset > b").text())
    );
  } catch (err) {
    console.log(err);
  }
}

main();
