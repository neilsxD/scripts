const fs = require("fs");
const { parse } = require("path");
const parser = require("../parser");

const productPageHtml = fs.readFileSync("tests/html/productPage1.html");

let parserResult;

beforeAll(() => {
  parserResult = parser(productPageHtml);
});

describe("parsing html product page correctly", () => {
  test("title", () => {
    expect(parserResult.title).toBe(
      "PICTEK Metal Gaming Keyboard, LED Wired Rainbow Keyboard, USB Backlit Membrane Keyboard with Wrist Rest, 19 Anti-ghosting Keys, 12 Multimedia Shortcuts, Spill-Resistant for Windows PC Gamer-Black"
    );
  });

  test("price", () => {
    expect(parserResult.price).toBe("$23.99");
  });
});
