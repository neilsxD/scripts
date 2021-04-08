const request = require("requestretry").defaults({
  fullResponse: false,
  retryDelay: 5000,
  maxAttempts: 5,
});
const chalk = require("chalk");
const { html } = require("cheerio");

const cheerio = require("cheerio");
const ObjectsToCsv = require("objects-to-csv");

const url = "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof";

const scrapeSample = {
  title: "Technical Autonomous Vehicle Trainer",
  description:
    "We're the driverless car company. We're building the world's best autonomous vehicles to safely connect people to the places, things, and experiences they care about.",
  datePosted: new Date("2018-07-13"),
  descriptionPage:
    "https://sfbay.craigslist.org/sfc/sof/d/technical-autonomous-vehicle/6642626746.html",
  place: "(SOMA / south beach)",
  address: "1201 Bryant St.",
  map_LatLong: [37.323208, -122.037714],
  compensation: "23/hr",
};

const scrapeResults = [];

const job_descriptionPage =
  "https://sfbay.craigslist.org/pen/sof/d/san-mateo-software-engineer-core/7215274259.html";

let debugResult = [];

async function scrapeJobHeader() {
  try {
    const htmlResult = await request.get(url);
    const $ = cheerio.load(htmlResult);

    $(".result-info")
      .slice(0, 5)
      .each((index, element) => {
        const titleElement = $(element).children("h2").children("a");
        const title = titleElement.text();
        const descriptionPage = titleElement.attr("href");
        const place = $(element).find(".result-hood").text();
        const date = new Date($(element).find(".result-date").attr("datetime"));

        const scrapeResult = { title, descriptionPage, date, place };
        scrapeResults.push(scrapeResult);
      });
    return scrapeResults;

    // console.log(text);
  } catch (err) {
    console.error(err);
  }
}

async function scrapeJobDescription(jobsWithHeaders) {
  return await Promise.all(
    jobsWithHeaders.map(async (job) => {
      try {
        const htmlResult = await request.get(job.descriptionPage);
        console.log(chalk.bgGreen(job.descriptionPage));

        const $ = await cheerio.load(htmlResult);
        $(".print-qrcode-container").remove();
        job.description = $("#postingbody").text().trim().slice(0, 500);
        job.address = $("div.mapaddress").text();
        const compensationText = $(".attrgroup").children().first().text();
        job.compensation = compensationText.replace("compensation: ", "");
        lat = $("#map").attr("data-latitude");
        long = $("#map").attr("data-longitude");
        job.map_latLong = [lat, long];
        return job;
      } catch (err) {
        console.log(err);
      }
    })
  );
}

async function scrapeJobDescriptionDebug() {
  try {
    const htmlResult = await request.get(job_descriptionPage);

    const $ = await cheerio.load(htmlResult);
    // $(".print-qrcode-container").remove();
    const description = $("#postingbody").text().trim().slice(0, 500);
    const address = $("div.mapaddress").text();
    const compensationText = $(".attrgroup").children().first().text();
    const compensation = compensationText.replace("compensation: ", "");
    const lat = $("#map").attr("data-latitude");
    const long = $("#map").attr("data-longitude");
    const map_latLong = [lat, long];
    console.log(chalk.bgRed(htmlResult));
    let result = { map_latLong, address, description, compensation };
    debugResult.push(result);
  } catch (err) {
    console.log(err);
  }
}

async function scrapeCraigslist() {
  const jobsWithHeaders = await scrapeJobHeader();
  const jobsFullData = await scrapeJobDescription(jobsWithHeaders);
  console.log(jobsFullData);
  // await scrapeJobDescriptionDebug();
  // console.log(chalk.bgGrey(debugResult));
}

scrapeCraigslist();
