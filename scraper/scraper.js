import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: true,
});
const page = await browser.newPage();

await page.setExtraHTTPHeaders({
  "sec-ch-ua": `"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"`,
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "Linux",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
});

await page.goto("https://www.pathe.fr/cinemas/cinema-pathe-wilson");

await page.waitForSelector(".row .card-screening .h3 a", { timeout: 1000000 });
const nameNodes = await page.$$(".row .card-screening .h3 a");

for (let nameNode of nameNodes) {
  // Extract text or any other property
  const text = await page.evaluate((el) => {
    return {
      link: el.getAttribute("href"),
      name: el.innerHTML,
    };
  }, nameNode);

  console.log(text);
}

await browser.close();
