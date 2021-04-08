const httpRequest = require("./httpRequest");

async function saveRequest(url) {
  let result = await httpRequest.getRequest(url);
  httpRequest.saveHtml(result);
}

saveRequest(
  "https://www.amazon.com/NPET-Floating-Keyboard-Mechanical-Illuminated/dp/B07GBSGTKV/ref=sr_1_3?dchild=1&keywords=gaming%2Bkeyboard&qid=1585952021&s=electronics&sr=1-3&th=1"
);
