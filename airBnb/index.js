const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto(
    "https://www.airbnb.co.in/s/Copenhagen--Denmark/homes?title_type=HOMES_WITH_LOCATION&s_tag=UrkEXloL&refinement_paths%5B%5D=%2Fhomes&click_referer=t%3ASEE_ALL%7Csid%3A9ea0a18e-f8e0-4eec-8840-b5a4290dfd22%7Cst%3ASTOREFRONT_DESTINATION_GROUPINGS&tab_id=home_tab&place_id=ChIJIz2AXDxTUkYRuGeU5t1-3QQ&federated_search_session_id=88108b4d-5b62-4a8a-b539-d7afc0f32001&search_type=pagination"
  );

  await page.setViewport({ width: 1536, height: 722 });

  await page.waitForSelector(
    "div > div > div > ._1048zci:nth-child(2) > ._gjfol0"
  );
  await page.click("div > div > div > ._1048zci:nth-child(2) > ._gjfol0");

  await navigationPromise;

  await page.waitForSelector(
    "._fz3zdn > form > ._1ot1we5p > ._163rr5i > ._19di23v"
  );
  await page.click("._fz3zdn > form > ._1ot1we5p > ._163rr5i > ._19di23v");

  await page.waitForSelector(
    "._ge6wj2 > ._1sysq29 > ._1hk9h0u > ._1mqc21n > ._ajuxzjo"
  );
  await page.click("._ge6wj2 > ._1sysq29 > ._1hk9h0u > ._1mqc21n > ._ajuxzjo");

  await browser.close();
})();
