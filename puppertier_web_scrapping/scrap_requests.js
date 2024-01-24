// Youtube tutorial for using Puppeter: https://www.youtube.com/watch?v=4SEXVxn7ayA&t=1115s
// The article for capturing get request: https://scrapfly.io/blog/how-to-capture-xhr-requests-puppeteer/#:~:text=When%20web%20scraping%20using%20Puppeteer,()%3B%20const%20page%20%3D%20await%20browser.
// I manually tried to clicked the button and used "inspect" to see what happens to the load more button.
// I then planed to repeatedly clicking the button until the load more button disappears,
// Meanwhile it should capture all the request send during the process and log them.
const puppeteer = require("puppeteer");
async function captureGetRequests () {
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let btnExist = true;
    // Navigate to the page
    await page.goto("https://www.smallbusinesscommissioner.gov.uk/blog/");
    // Allow capturing background request
    await page.setRequestInterception(true);
    // Log background request
    page.on("request", (request) => {
      console.log(request);
      request.continue();
    });
    // repeatedly click the load more button until it cannot be found
    while (btnExist) {
      // Wait for the button to be loaded first so that it can be found with selector
      await page.waitForSelector(
        "#blogs-content > div > div.search-group-home > button"
      );
      const btnHandle = await page.$(
        "#blogs-content > div > div.search-group-home > button"
      );
      btnExist = btnHandle != null;
      if (btnExist) {
        await page.click("#blogs-content > div > div.search-group-home > button");
      }
    }
    await browser.close();
  }catch(err){
  }
  
}

captureGetRequests()