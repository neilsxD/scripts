const fs = require("fs");
const { parse } = require("path");
const parser = require("../parser");

const productPageHtml = fs.readFileSync("tests/html/productPage2.html");

let parserResult;

beforeAll(() => {
  parserResult = parser(productPageHtml);
});

describe("parsing html product page 2 correctly", () => {
  test("title", () => {
    expect(parserResult.title).toBe(
      "NPET K11 Wireless Gaming Keyboard, Rechargeable Backlit Ergonomic Water-Resistant Mechanical Feeling Keyboard, 2.4G Wireless Ultra-Slim Rainbow LED Backlit Keyboard for PS4, Xbox One, Desktop, PC"
    );
  });

  test("price", () => {
    expect(parserResult.price).toBe("$39.99");
  });

  test("productLinks", () => {
    console.log(parserResult.productLinks);
    expect(parserResult.productLinks.length).toBe(5);
  });
});
