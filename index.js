const startBrowser = require('./brower')
const scrapeController = require('./scrapController')

let browser = startBrowser()
scrapeController(browser)