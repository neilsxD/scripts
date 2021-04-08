const needle = require("needle");
const fs = require("fs");

async function getRequest(url, options) {
  let result = await needle("get", url, options);
  return result.body;
}

let testCount = 1;

function saveHtml(html) {
  fs.writeFileSync(`./test${testCount}.html`, html); //not working in the we wanted

  testCount = testCount + 1;
}

module.exports = {
  getRequest,
  saveHtml,
};
