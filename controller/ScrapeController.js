const validator = require('validatorjs');
const puppeteer = require('puppeteer');

const GetMetaData = async (page) => {
    const meta = await page.$$('meta')
    const metaElements = []
    for (const [i, element] of meta.entries()) {
        metaElements[i] = {
            httpEquiv: await page.evaluate((el) => Promise.resolve(el.getAttribute("http-equiv")), element),
            name: await page.evaluate((el) => Promise.resolve(el.getAttribute("name")), element),
            property: await page.evaluate((el) => Promise.resolve(el.getAttribute("property")), element),
            content: await page.evaluate((el) => Promise.resolve(el.getAttribute("content")), element)
        }
    }
    return metaElements
}

const GetPageTtile = async (page)=>{
    const element = await page.$('title')
    return (await page.evaluate((el) => Promise.resolve(el.innerText), element))
}
module.exports = async (req, res) => {

    let metaElements = []
    let pageTitle = ''
    let validation = new validator(req.query, {
        url: 'required|url',
    });

    if (validation.fails() === true) {
        return res.status(403).json(validation.errors.all())
    }
    console.log('Starting meta search')
    const browser = await puppeteer.launch()
    try {
        const page = await browser.newPage()
        await page.setViewport({
            width: 1300,
            height: 700,
            deviceScaleFactor: 1,
        })
        await page.goto(req.query.url, {
            waitUntil: "domcontentloaded"
        });
        metaElements = await GetMetaData(page)
        pageTitle = await GetPageTtile(page)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Meta search faced an internal issue. Please try again')
    } finally {
        browser.close()
        console.log('Closing meta search')
        return res.status(200).json({
            message: 'Metadata succesfully searched',
            pageTitle,
            data: metaElements,
        })
    }

}