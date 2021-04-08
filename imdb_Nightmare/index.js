const request = require("request-promise");
const cheerio = require("cheerio");
const chalk = require("chalk");
const ObjectsToCsv = require("objects-to-csv");
const Nightmare = require("nightmare");
const { bgGray } = require("chalk");
const nightmare = Nightmare({ show: true });
const regularRequest = require("request");
const fs = require("fs");

let scrapeUrl = "https://www.imdb.com/chart/moviemeter/";

let example = [
  {
    name: "borat : subsequent",
    rank: "1",
    rating: "7.0",
    descriptionUrl:
      "https://www.imdb.com/title/tt13143964/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=ea4e08e1-c8a3-47b5-ac3a-75026647c16e&pf_rd_r=G4RS4TA0E2CT0CNTN9XX&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_1",
    imageUrl: "https://www.imdb.com/title/tt13143964/mediaviewer/rm2793841665",
    posterImageUrl:
      "https://m.media-amazon.com/images/M/MV5BMTk0MTQ3NDQ4Ml5BMl5BanBnXkFtZTcwOTQ3OTQzMw@@._V1_.jpg",
  },
];

async function createCsvFile(data) {
  const csv = new ObjectsToCsv(data);

  // Save to file:
  await csv.toDisk("./CSV.csv");

  // // Return the CSV file as string:
  // console.log(await csv.toString());
}

async function scrapingHeaders() {
  try {
    const html = await request.get(scrapeUrl);
    const $ = await cheerio.load(html);

    const movies = $("tr")
      .map((i, e) => {
        const title = $(e).find("td.titleColumn > a").text();
        const descriptionUrl =
          "https://www.imdb.com" + $(e).find("td.titleColumn > a").attr("href");
        const imdbRating = $(e)
          .find("td.ratingColumn.imdbRating")
          .text()
          .trim();
        return { title, imdbRating, rank: i, descriptionUrl };
      })
      .get()
      .slice(1, 10);
    return movies;
  } catch (err) {
    console.log(chalk.bgRed(err));
  }
}

async function scraperPosterUrl(movies) {
  const moviesWithPosterUrl = await Promise.all(
    movies.map(async (movie) => {
      //will check if i and e will give us the same result
      try {
        const html = await request.get(movie.descriptionUrl);
        const $ = await cheerio.load(html);
        movie.posterUrl =
          "https://www.imdb.com" + $("div.poster > a").attr("href");
        return movie;
      } catch (err) {
        console.error(err);
      }
    })
  );
  return moviesWithPosterUrl;
}

async function getPosterImageUrl(movies) {
  for (var i = 0; i < movies.length; i++) {
    try {
      const posterImageUrl = await nightmare
        .goto(movies[i].posterUrl)
        .inject("js", "jquery.min.js")
        .wait()
        .evaluate(() =>
          $(
            "#__next > main > div.ipc-page-content-container.ipc-page-content-container--full.BaseLayout__NextPageContentContainer-sc-180q5jf-0.kyGMDO > div.styles__MediaViewerContainerNoNav-q67kgi-1.kOoZVO.media-viewer > div:nth-child(4) > img"
          ).attr("src")
        );
      movies[i].posterImageUrl = posterImageUrl;
      savePosterToDisk(movies[i]);
      console.log(bgGray(movies[i]));
    } catch (err) {
      console.error(err);
    }
  }

  return movies;
}

async function savePosterToDisk(movie) {
  regularRequest
    .get(movie.posterImageUrl)
    .pipe(fs.createWriteStream(`posters/${movie.rank}.png`)); //some possible error while saving the data
}

async function main() {
  let movies = await scrapingHeaders();
  movies = await scraperPosterUrl(movies);
  movies = await getPosterImageUrl(movies);
  console.log(movies);
  await createCsvFile(movies);
}

main();
