import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
const browser = await puppeteer.launch({
  headless: true,
  browser:"firefox"
  
  
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
  
  await page.waitForSelector(".card-screening__content");
  const nameNodes = await page.$$(".card-screening__content");
  
  const linkTitles = []
  for (let nameNode of nameNodes) {
    console.log(nameNodes.slice(0,2))
    
    const linkTitle = await page.evaluate((el) => {
      return {
        link: el.querySelector(".h3 a").getAttribute("href"),
        name: el.querySelector(".h3 a").innerHTML,
        imageLink: el.querySelector("img").getAttribute("src")
        
      };
    }, nameNode);

    console.log(linkTitle)

    linkTitles.push(linkTitle)

   
  
    
  }

  const domain = "https://www.pathe.fr"
  for (let linkTitle of linkTitles){
    //await new Promise(resolve => setTimeout(resolve, 15000));

    //console.log(domain+linkTitle.link);

    await page.goto(domain+linkTitle.link);

    await page.waitForSelector(".container .hero-film__content .ft-default")  

    const durationNode  = await page.$$(".container .hero-film__content .ft-default")
    
    
    
    linkTitle['duration'] = await page.evaluate((el) => el.innerHTML, durationNode[0])

    linkTitle['genre'] = await page.evaluate((el) => el.innerHTML, durationNode[1])
     

    await page.waitForSelector(".container .hero-film__content .hero-film__body a[role='button']");

    const moreInfoNode = await page.$(".container .hero-film__content .hero-film__body a[role='button']");


    await new Promise(resolve => setTimeout(resolve, 5000));

    //await moreInfoNode.click()

    await page.evaluate((element) => {
        element.click()
      }, moreInfoNode)
    
    await page.waitForSelector(".modal .container .row .ft-primary")

    const descriptionNode  = await page.$(".modal .container .row .ft-primary")

    linkTitle['description'] = await page.evaluate((el) => el.innerHTML
       
      , descriptionNode )

    await page.waitForSelector(".modal .container .row .c-white-50 li")  

    const directorNode  = await page.$(".modal .container .row .c-white-50 li strong")
    
    

    linkTitle['director'] = await page.evaluate((el) => el.innerHTML, directorNode)
     

    console.log(linkTitle)

    

    
}

  

const data = JSON.stringify(linkTitles)
writeFileSync('output1.json', data);  


await browser.close();

