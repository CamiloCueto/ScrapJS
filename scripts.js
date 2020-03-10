const puppeteer = require('puppeteer')
const fs = require('fs')

async function run() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let productos = []
    async function getPageData(pageNumber = 1 ){
        await page.goto('https://www.lider.cl/supermercado/category/Especiales/Especial/Especiales-Supermercado/Horno/_/N-1741blw')
    
    
    
    const data = await page.evaluate(() => {
        const $productos = document.querySelectorAll('.product-item-box')
        const data = []
        $productos.forEach(($productos) => {
            data.push({
                producto: $productos.querySelector('.product-name').textContent.trim(),
                precio: $productos.querySelector('.price-sell').textContent.trim(),
            })
        })
        return {
            productos: data,
        // product-name
        // price-sell
        }
    })
    productos = [...productos, ...data.productos]
    fs.writeFile('data.js', `export default ${JSON.stringify(productos)}`,()=>{
        console.log('data writed')   
        //console.log(data)
    })
    await browser.close()

}
    getPageData()
    //await browser.close()
    
}

run()