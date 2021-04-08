const needle = require("needle");
const mongodb = require("./mongodb/mongodb.connect");
const fetch = require("node-fetch");

const requestOptions = {
  headers: {
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
  },
};

const options = {
  headers: {
    accept: "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",

    referer:
      "https://www2.hm.com/en_in/men/shop-by-product/view-all.html?sort=stock&image-size=small&image=model&offset=0&page-size=36",
  },
  referrer:
    "https://www2.hm.com/en_in/men/shop-by-product/view-all.html?sort=stock&image-size=small&image=model&offset=0&page-size=36",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: null,
  method: "GET",
  mode: "cors",
  credentials: "include",
};

async function main() {
  const mongoClient = await mongodb();

  const hmdb = mongoClient.db("hm");
  //   const womenProducts = hmdb.collection("women-products-Search-leggings");
  //   const womenProducts = hmdb.collection("all-women-products");
  // const womenProducts = hmdb.collection("all-men-products");
  const womenProducts = hmdb.collection("all-men-products-test3");

  const pageSize = 50;
  let totalProducts = 1000;
  let result;

  for (let offset = 0; offset < totalProducts; offset = offset + pageSize) {
    // const result = await needle(
    //   "get",
    //   //   `https://www2.hm.com/en_in/search-results/_jcr_content/search.display.json?q=leggings&department=1&sort=stock&image-size=small&image=stillLife&offset=${offset}&page-size=${pageSize}`,
    //   `https://www2.hm.com/en_in/women/shop-by-product/view-all/_jcr_content/main/productlisting_30ab.display.json?sort=stock&image-size=small&image=model&offset=${offset}&page-size=${pageSize}`,
    //   requestOptions
    // );

    const RawResult = await fetch(
      `https://www2.hm.com/en_in/men/shop-by-product/view-all/_jcr_content/main/productlisting_fa5b.display.json?sort=stock&image-size=small&image=model&offset=${offset}&page-size=${pageSize}`,
      options
    );

    console.log(RawResult);
    result = await RawResult.json();
    console.log(result);

    totalProducts = await result.total;
    await womenProducts.insertMany(result.products);
    await sleep(3000);
    console.log(offset);
    console.log(totalProducts);

    if (offset > 150) {
      console.log("took a break");
    }
  }

  //   console.log(result.body);
}

async function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

main();
