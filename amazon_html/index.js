const fs = require("fs");
const { parse } = require("path");
const parser = require("./parser");

const productPageHtml = fs.readFileSync("tests/html/productPage1.html");

async function main() {
  const parserResult = await parser(productPageHtml);

  console.log(parserResult.title);
}

main();
