var express = require("express");
const chalk = require("chalk");
var router = express.Router();
const request = require("request-promise").defaults({
  headers: {
    Authorization: "apikey 8ea31c48-95c3-4bcf-9db1-d6ada47565f2",
    NordApiVersion: 2,
  },
});

/* GET home page. */
router.get("/", async function (req, res, next) {
  console.log(chalk.bgCyan(JSON.stringify(req.query))); // oh yeah, now ye know how to stringify
  const top = req.query.top;
  const keyword = encodeURIComponent(req.query.keyword); // to automatically add code word in place of space
  const url = `https://query.ecommerce.api.nordstrom.com/api/queryresults/keywordsearch/?top=${top}&IncludeFacets=false&Keyword=${keyword}`;
  const json = await request.get(url);
  console.log(chalk.bgBlue(url));
  res.setHeader("content-type", "application/json");
  res.send(json);
});

module.exports = router;
