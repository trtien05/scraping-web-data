const startBrowser = require('./brower')
const scrapeController = require('./scrapController')
const scrapeControllerMap = require('./scapControllerMap')

let browser = startBrowser()
// scrapeController(browser)
scrapeControllerMap(browser)