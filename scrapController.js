const scrapers = require('./scraper');

const scrapeController = async (browserInstance) => {
  const url = 'https://phongtro123.com'
  const indexs = [0, 1, 2, 3]
  try {
    let browser = await browserInstance
    // gọi hàm cạo ở file s scrape
    const categories = await scrapers.scrapeCategory(browser, url)
    const selectedCategories = categories.filter((category, index) => indexs.some(i => i === index))
    console.log("selectedCategories: ", selectedCategories)

    let result2 = await scrapers.scraper(browser, url + selectedCategories[0].link)

  } catch (error) {
    console.log("lỗi ở scrapeController: " + error)

  }
}
module.exports = scrapeController