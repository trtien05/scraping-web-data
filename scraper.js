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
          url: item.querySelector('a').getAttribute('href')
        }
      })
      return dataCategory
    })
    console.log("dataCategory: ", dataCategory)
    await page.close()
    console.log("tab đã đóng")
    resolve()

  } catch (error) {
    console.log('lỗi ở scrape category: ' + error)
    reject(error)
  }
})
module.exports = { scrapeCategory }