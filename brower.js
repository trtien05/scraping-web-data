const puppeteer = require('puppeteer')

const startBrowser = async () => {
  let browser
  try {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', // Đường dẫn đến Edge
      args: [
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--enable-features=PermissionAutoreply', // Bật tính năng tự động trả lời
        '--unsafely-treat-insecure-origin-as-secure=https://www.ninjavan.co/vi-vn/support/find-ninja-point', // (Tuỳ chọn) Xử lý các origin không an toàn
        '--use-fake-ui-for-media-stream', // Tự động chấp nhận quyền
        '--allow-geolocation', // Cho phép vị trí
      ],
      'ignoreHTTPSErrors': true
    })

  } catch (error) {
    console.log('Không tạo được browser: ' + error)
  }
  return browser

}

module.exports = startBrowser