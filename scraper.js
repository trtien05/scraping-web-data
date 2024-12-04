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
        description: header.querySelector('p').innerText,
      }
    })
    scrapeData.header = headerData

    // lấy links detail item
    const detailLinks = await newPage.$$eval('.post__listing li', (els) => {
      return els.map(el => {
        const linkElement = el.querySelector('.pt-3 > h3 > a');
        return linkElement ? linkElement.href : null; // Kiểm tra nếu thẻ <a> tồn tại
      }).filter(link => link !== null); // Loại bỏ giá trị null nếu không tìm thấy <a>
    })

    const scraperDetail = async (link) => new Promise(async (resolve, reject) => {
      try {
        let pageDetail = await browser.newPage()
        await pageDetail.goto(link)
        console.log('>> Truy cập ' + link);
        await pageDetail.waitForSelector('#webpage')

        const detailData = {}
        // bắt đầu cạo
        // cạo ảnh
        const images = await pageDetail.$$eval('#carousel_Photos .carousel-inner > div', (els) => {
          images = els.map(el => {
            return el.querySelector('img')?.src
          })
          return images.filter(i => !i === false)
        })
        detailData.images = images

        // lấy header detail
        const headerData = await pageDetail.$$eval('header', (el) => {
          const header = el[1];
          return {
            title: header.querySelector('h1').innerText,
            star: header.querySelector('.star')?.className.match(/star-(\d+)/)?.[1] || 0,
            address: header.querySelector('address').innerText,
            atribute: {
              price: header.querySelector('.text-price').innerText,
              area: header.querySelector('span:nth-of-type(3)').innerText,
              time: header.querySelector('time').innerText,
            }
          }
        })

        // thông tin mô tả
        const mainContentHeader = await pageDetail.$eval('.border-bottom.pb-3.mb-4', (el) => {
          return {
            title: el.querySelector('h2').innerText, // Lấy tiêu đề
            content: Array.from(el.querySelectorAll('p')).map((p) => p.innerText), // Lấy tất cả nội dung <p>
          };
        });

        // thông tin nổi bật
        // const highlights = await pageDetail.$$eval('.border-bottom.pb-3.mb-4', (els) => {
        //   const targetEl = els[1]; // Chọn phần tử thứ 2 (index bắt đầu từ 0)
        //   return {
        //     title: targetEl.querySelector('h2').innerText, // Lấy tiêu đề
        //     features: Array.from(targetEl.querySelectorAll('.row .text-body')).map((feature) => {
        //       const text = feature.innerText; // Nội dung đặc điểm
        //       const isHighlighted = feature.querySelector('i.green') !== null; // Kiểm tra có class 'green'
        //       return { text, isHighlighted }; // Trả về đặc điểm cùng trạng thái nổi bật
        //     }),
        //   };
        // });

        detailData.mainContent = {
          header: headerData,
          content: mainContentHeader
        }
        // detailData.highlights = highlights
        await pageDetail.close()
        console.log('>> Đã đóng tab ' + link)
        resolve(detailData)

      } catch (error) {
        console.log('lỗi ở scrape detail: ' + error)
        reject(error)
      }
    }
    )
    const details = [];
    for (const link of detailLinks) {
      const detail = await scraperDetail(link);
      details.push(detail);
    }
    scrapeData.body = details;
    console.log('>> Trình duyệt đã đóng.');
    resolve(scrapeData)
  } catch (error) {
    reject(error)
  }
})

const scrapeAddress = (browser, url) => new Promise(async (resolve, reject) => {
  try {
    let page = await browser.newPage()
    console.log('>> Mở tab mới ...');
    // Thiết lập vị trí giả lập (tuỳ chỉnh theo nhu cầu)
    await page.setGeolocation({ latitude: 10.762622, longitude: 106.660172 }); // Hồ Chí Minh

    // Gán quyền geolocation
    const context = browser.defaultBrowserContext();

    await context.overridePermissions(url, ['geolocation']);
    await page.goto(url)
    console.log('>>Truy cập vào ' + url)
    await page.waitForSelector('#___gatsby')
    console.log('>> Website đã load xong...');
    // Cho phép quyền "geolocation" cho URL

    // const dataCategory = await page.$$eval('.pt123__nav > ul > li', item => {
    //   const dataCategory = item.map((item) => {
    //     return {
    //       category: item.querySelector('a').innerText,
    //       link: item.querySelector('a').getAttribute('href')
    //     }
    //   })
    //   return dataCategory
    // })
    // await page.close()
    // console.log("tab đã đóng")
    // resolve(dataCategory)

  } catch (error) {
    console.log('lỗi ở scrape address: ' + error)
    reject(error)
  }
})

module.exports = { scrapeCategory, scraper, scrapeAddress }