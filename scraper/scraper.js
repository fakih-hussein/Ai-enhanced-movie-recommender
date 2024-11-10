import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: true,
  browser:'firefox'
  
});
const page = await browser.newPage();

const firefox = {
     "Sec-Fetch-Dest" : "document",
     "Sec-Fetch-Mode": "navigate",
     "Sec-Fetch-Site": "none", 
     "Sec-Fetch-User": "?1",
     "Upgrade-Insecure-Requests":"1",
     "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0"

}

const chrome = {
    "sec-ch-ua": `"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"`,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "Linux",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  }
await page.setExtraHTTPHeaders(firefox);
  
  await page.goto("https://www.pathe.fr/cinemas/cinema-pathe-wilson");
  
  await page.waitForSelector(".row .card-screening .h3 a");
  const nameNodes = await page.$$(".row .card-screening .h3 a");
  
  const linkTitles = []
  for (let nameNode of nameNodes) {
    
    const linkTitle = await page.evaluate((el) => {
      return {
        link: el.getAttribute("href"),
        name: el.innerHTML,
        
      };
    }, nameNode);

    linkTitles.push(linkTitle)

   
  
    
  }

  const domain = "https://www.pathe.fr"
  for (let linkTitle of linkTitles){

    //console.log(domain+linkTitle.link);

    await page.goto(domain+linkTitle.link);

    await page.waitForSelector(".container .hero-film__content .ft-default")  

    const durationNode  = await page.$$(".container .hero-film__content .ft-default")
    
    
    
    const duration = await page.evaluate((el) => el.innerHTML, durationNode[0])

    const genre = await page.evaluate((el) => el.innerHTML, durationNode[1])
     

    //console.log(duration)


    

    await page.waitForSelector(".container .hero-film__content .hero-film__body a[role='button']");

    const moreInfoNode = await page.$(".container .hero-film__content .hero-film__body a[role='button']");

    await moreInfoNode.click()
    
    await page.waitForSelector(".modal .container .row .ft-primary")

    const descriptionNode  = await page.$(".modal .container .row .ft-primary")

    const description = await page.evaluate((el) => el.innerHTML
       
      , descriptionNode )

    await page.waitForSelector(".modal .container .row .c-white-50 li")  

    const directorNode  = await page.$(".modal .container .row .c-white-50 li strong")
    
    

    const director = await page.evaluate((el) => el.innerHTML, directorNode)
     

    console.log(director)

    

    
}

  

  


await browser.close();
