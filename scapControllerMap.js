const scrapers = require('./scraper')
const fs = require('fs')

const scrapeControllerMap = async (browserInstance) => {
  const url = 'https://www.google.com/search?q=ninjavan+buu+cuc&sca_esv=293021c43ebdc58d&source=hp&ei=iD5QZ5CQKsrg2roPwZL9wAk&iflsig=AL9hbdgAAAAAZ1BMmI1vg9ydZAstdGzXgbRypAIoPwWE&ved=0ahUKEwiQ9MTxgo6KAxVKsFYBHUFJH5gQ4dUDCA4&uact=5&oq=ninjavan+buu+cuc&gs_lp=Egdnd3Mtd2l6IhBuaW5qYXZhbiBidXUgY3VjMgcQABiABBgNMgIQJjICECYyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYogQYiQUyCBAAGIAEGKIESNVGUABY5ENwAHgAkAEAmAGSAaAB8w6qAQQwLjE2uAEDyAEA-AEC-AEBmAIOoAL7DcICBxAAGIAEGBPCAgkQABiABBgTGArCAgYQABgTGB7CAggQABgTGAoYHsICCBAAGBMYBxgewgIKEAAYExgHGAoYHsICBxAAGIAEGArCAgYQABgHGB7CAgsQLhiABBjHARivAcICBRAAGIAEwgINEC4YgAQYxwEYChivAcICBhAAGA0YHsICBhAAGBYYHsICCBAAGBYYChgemAMAkgcEMC4xNKAHs3s&sclient=gws-wiz'
  try {
    let browser = await browserInstance
    // gọi hàm cạo ở file s scrape

    let result2 = await scrapers.scrapeAddress(browser, url)

    // fs.writeFile('map.json', JSON.stringify(result2), (err) => {
    //   if (err) console.log('Ghi data vô file json thất bại: ' + err)
    //   console.log('Thêm data thanh công !.')
    // })
  } catch (error) {
    console.log("lỗi ở scrapeControllerMap: " + error)
  }
}
module.exports = scrapeControllerMap