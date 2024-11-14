import landingPage from '../pageobjects/flipkart/landing.js'
// import productPage from '../pageobjects/flipkart/product.js'
// import {scrollAndClick} from '../helpers/action.js'

describe('Sample workflow of flipkart', ()=>{
    it('Load the website', async()=>{
        await landingPage.loadUrl();
        expect(await landingPage.$validateHeader().isDisplayed())
            .withContext('The website is not loaded')
            .toBeTrue();
    })

    it('Should search for a product', async()=>{
        await landingPage.searchProduct();
        // await scrollAndClick(landingPage.$searchButton())
        // expext(await productPage.$validateSearch().isDisplayed())
        //     .withContext('Product cannot be searched')
        //     .toBeTrue();
    })
})