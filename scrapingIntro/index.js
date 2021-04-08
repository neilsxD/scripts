const request = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");

async function main() {
  const html = await request.get(
    // "https://reactnativetutorial.net/css-selectors/lesson2.html"
    "https://www.nordstrom.com/browse/women/clothing/dresses?breadcrumb=Home%2FWomen%2FClothing%2FDresses&origin=topnav"
  );

  fs.writeFileSync("./test.html", html);
}

main();
