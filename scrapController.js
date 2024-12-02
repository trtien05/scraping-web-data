const scrapers = require('./scraper');

const scrapeController = async (browserInstance) => {
  const url = 'https://phongtro123.com/cho-thue-phong-tro'
  try {
    let browser = await browserInstance
    // gọi hàm cào ở file scraper.js
    let data = await scrapers.scrapeCategory(browser, url)
  } catch (error) {
    console.log("lỗi ở scrapeController: " + error)

  }
}
module.exports = scrapeController