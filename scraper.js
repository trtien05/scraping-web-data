const scrapeCategory = (browser, url) => new Promise(async (resolve, reject) => {
  try {
    let page = await browser.newPage()
    console.log('>> Mở tab mới ...');
    await page.goto(url)
    console.log('>>Truy cập vào ' + url)
    await page.waitForSelector('#webpage')
    console.log('>> Website đã load xong...');

    const dataCategory = await page.$$eval('.pt123__nav > ul > li', item => {
      const dataCategory = item.map((item) => {
        return {
          category: item.querySelector('a').innerText,
          link: item.querySelector('a').getAttribute('href')
        }
      })
      return dataCategory
    })
    await page.close()
    console.log("tab đã đóng")
    resolve(dataCategory)

  } catch (error) {
    console.log('lỗi ở scrape category: ' + error)
    reject(error)
  }
})

const scraper = (browser, url) => new Promise(async (resolve, reject) => {
  try {
    let newPage = await browser.newPage()
    console.log('>> Đã mở tab mới ...');
    await newPage.goto(url)
    console.log(">> Đã truy cập vào trang " + url)
    await newPage.waitForSelector('.container')
    console.log('>> Website đã load xong...');

    const scrapeData = {}
    // lấy header
    const headerData = await newPage.$$eval('header', (el) => {
      const header = el[1];
      return {
        title: header.querySelector('h1').innerText,
        description: header.querySelector('p').innerText
      }
    })
    console.log("headerData: ", headerData)
  } catch (error) {
    reject(error)
  }
})

module.exports = { scrapeCategory, scraper }