const cheerio = require("cheerio");

function parseAll(html) {
  const $ = cheerio.load(html);
  const title = $("#productTitle").text().trim();

  //
  //

  let price; // your code is a peice of shit, do better
  if ($("#priceblock_ourprice").text().trim()) {
    price = $("#priceblock_ourprice").text().trim();
  } else if ($("#priceblock_saleprice").text().trim()) {
    price = $("#priceblock_saleprice").text().trim();
  } else {
    price = 0;
  }

  //
  //

  const productLinks = $("a")
    .map((index, element) => $(element).attr("herf"))
    .get();
  // .filter((link) => link.startWith("/dp/"));

  console.log(productLinks);

  return { title, price, productLinks };
}

module.exports = parseAll;
