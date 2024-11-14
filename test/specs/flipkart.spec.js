/**
 * Imports
 */
import landingPage from '../pageobjects/flipkart/landing.js'
import productPage from '../pageobjects/flipkart/product.js'
import detailsPage from '../pageobjects/flipkart/details.js'
import cartPage from '../pageobjects/flipkart/cart.js'
import data from '../testData/flipkartData.json' assert{type : 'json'}

describe('Sample workflow for Flipkart', ()=>{
    it('Load URL of the website', async()=>{
        await landingPage.loadUrl();
        expect(await landingPage.$validateHeader().isDisplayed())
            .withContext('Expected page is not loaded')
            .toBeTrue();
    })

    it('Should select mobiles category', async()=>{
        await landingPage.selectProduct();
        expect(await productPage.$validateProduct().isDisplayed())
            .withContext('Expected page is not loaded')
            .toBeTrue();
    })

    it('Should select minimum price for the selected product', async()=>{
        await productPage.filterPrice(data.minPrice);
        expect(await productPage.$validatePrice().isDisplayed())
            .withContext('Price is not filtered')
            .toBeTrue();
    })

    it('should validate that the products displayed are priced greater than the selected minimum price', async () => {
        let isValid = await productPage.validateProductsPrice(data.minPrice);
        expect(isValid)
            .withContext('Expected products price is not greater than the selected minimum price')
            .toEqual(true);
    });

    it('To check user can navigate to the various number of pages displayed', async()=>{
        await productPage.navigateToNextPage();
        let color = await productPage.$pageNumber().getCSSProperty("Background");
        expect((color).parsed.hex)
            .withContext('User is not navigated to next page')
            .toEqual('#2874f0');
    })

    it('Select a product', async()=>{
        await productPage.selectProduct();
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1])
        expect(await detailsPage.$productPageHeader().isDisplayed())
            .withContext('Expected product details page is not loaded')
            .toBeTrue();
    })

    it('Should add product to the cart', async()=>{
        await detailsPage.addProductToCart();
        expect(await cartPage.$saveForLater().isDisplayed())
            .withContext('Expected product is not added to the cart')
            .toBeTrue();
    })
    
})