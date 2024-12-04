const scrapers = require('./scraper');
const fs = require('fs')

const scrapeController = async (browserInstance) => {
  const url = 'https://phongtro123.com'
  const indexs = [0, 1, 2, 3]
  try {
    let browser = await browserInstance
    // gọi hàm cạo ở file s scrape
    const categories = await scrapers.scrapeCategory(browser, url)
    const selectedCategories = categories.filter((category, index) => indexs.some(i => i === index))

    let result2 = await scrapers.scraper(browser, url + selectedCategories[0].link)
    fs.writeFile('nhachothue.json', JSON.stringify(result2), (err) => {
      if (err) console.log('Ghi data vô file json thất bại: ' + err)
      console.log('Thêm data thanh công !.')
    })
  } catch (error) {
    console.log("lỗi ở scrapeController: " + error)
  }
}
module.exports = scrapeController