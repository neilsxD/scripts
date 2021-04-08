const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

puppeteer.launch({ headless: false }).then(async (browser) => {
  console.log("Running tests..");

  const page = await browser.newPage();

  try {
    const navigationPromise = page.waitForNavigation(); // hmm ok

    await page.goto(
      "https://accounts.google.com/signin/v2/identifier?service=wise&passive=1209600&continue=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLSe7NO4IH5fs6pYMOH0WJPLkPFu6V7TRaY2k17vvr7Kao90aKA%2Fviewform&followup=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLSe7NO4IH5fs6pYMOH0WJPLkPFu6V7TRaY2k17vvr7Kao90aKA%2Fviewform&ltmpl=forms&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
    );

    await page.setViewport({ width: 1536, height: 722 });

    await navigationPromise;

    await page.waitForSelector(".rFrNMe #identifierId");
    await page.type(
      ".rFrNMe #identifierId",
      "neelansh.17je003468@cse.iitism.ac.in"
    );

    await page.waitForSelector(
      ".qhFLie > #identifierNext > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe > .VfPpkd-RLmnJb"
    );
    await page.click(
      ".qhFLie > #identifierNext > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe > .VfPpkd-RLmnJb"
    );

    await sleep(2000);

    await page.waitForSelector(
      "#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input"
    );
    await page.type(
      "#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input",
      "passkaradebhai"
    );

    await page.waitForSelector(
      "#passwordNext > div > button > div.VfPpkd-RLmnJb"
    );
    await page.click("#passwordNext > div > button > div.VfPpkd-RLmnJb");

    await page.waitForSelector("#yDmH0d > .H2SoFe > #initialView > .ANuIbb");
    await page.click("#yDmH0d > .H2SoFe > #initialView > .ANuIbb");

    await navigationPromise;

    await page.waitForSelector(
      ".quantumWizTextinputPaperinputEl > .quantumWizTextinputPaperinputMainContent > .quantumWizTextinputPaperinputContentArea > .quantumWizTextinputPaperinputInputArea > .quantumWizTextinputPaperinputInput"
    );
    await page.type(
      ".quantumWizTextinputPaperinputEl > .quantumWizTextinputPaperinputMainContent > .quantumWizTextinputPaperinputContentArea > .quantumWizTextinputPaperinputInputArea > .quantumWizTextinputPaperinputInput",
      "17JE003393"
    );

    await page.waitForSelector(
      ".docssharedWizToggleLabeledLabelWrapper > .appsMaterialWizToggleRadiogroupElContainer > #i12 > .appsMaterialWizToggleRadiogroupRadioButtonContainer > .appsMaterialWizToggleRadiogroupOffRadio"
    );
    await page.click(
      ".docssharedWizToggleLabeledLabelWrapper > .appsMaterialWizToggleRadiogroupElContainer > #i12 > .appsMaterialWizToggleRadiogroupRadioButtonContainer > .appsMaterialWizToggleRadiogroupOffRadio"
    );

    await page.waitForSelector(
      ".freebirdFormviewerViewNavigationButtonsAndProgress > .freebirdFormviewerViewNavigationLeftButtons > .appsMaterialWizButtonEl > .appsMaterialWizButtonPaperbuttonContent > .appsMaterialWizButtonPaperbuttonLabel"
    );
    await page.click(
      ".freebirdFormviewerViewNavigationButtonsAndProgress > .freebirdFormviewerViewNavigationLeftButtons > .appsMaterialWizButtonEl > .appsMaterialWizButtonPaperbuttonContent > .appsMaterialWizButtonPaperbuttonLabel"
    );

    await navigationPromise;

    await page.waitForSelector(
      ".freebirdFormviewerViewCenteredContent > .freebirdFormviewerViewFormCard > .freebirdFormviewerViewResponseConfirmContentContainer > .freebirdFormviewerViewResponseLinksContainer > a"
    );
    await page.click(
      ".freebirdFormviewerViewCenteredContent > .freebirdFormviewerViewFormCard > .freebirdFormviewerViewResponseConfirmContentContainer > .freebirdFormviewerViewResponseLinksContainer > a"
    );

    await navigationPromise;
  } catch (err) {
    console.error(err);
  }
});
