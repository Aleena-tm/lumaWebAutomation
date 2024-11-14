import Common from '../flipkart/common.js'

class Productpage extends Common{
    constructor(){
        super();
        this.$validateProduct =()=>$(`//h1[text()="Mobile Phones"]`);
        this.$minimumPrice =()=>$(`(//select[@class="Gn+jFg"])[1]`);
        this.$selectMinimum =(data)=>$(`(//option[text()="${data}"])[1]`);
        this.$validatePrice =()=>$(`//div[text()="₹15000-₹30000+"]`);
        this.$$productsPrice =()=>$$(`//div[contains(@class,"col")]/following::div[contains(@class,"DiR")]`);
        this.$nextPage =()=>$(`//span[text()="Next"]`);
        this.$pageNumber =()=>$(`//a[@class="cn++Ap A1msZJ"]`);
        this.$productSelected =()=>$(`//div[text()="Infinix Note 40 Pro 5G (Racing Grey, 256 GB)"]`);
    }
    /**
     * To set minimum price for the products to be displayed
     * @param {number} minPrice 
     */
    async filterPrice(minPrice){
        await this.$minimumPrice().click();
        await this.$selectMinimum(minPrice).click();
        await this.$validatePrice().waitForDisplayed({timeout: 5000, timeoutMsg: 'Price is not filtered'});
    }
    /**
     * To validate the prices of the displayed products are greater than minimum price
     * @param {number} minPrice 
     * @returns Boolean
     */
    async validateProductsPrice(minPrice) {
        const prices = await this.$$productsPrice(); 
        const productsPrice = [];
    
        for (const priceElement of prices) {
            const priceText = await priceElement.getText();
            let priceNumber = priceText.replace('$', '');
            let priceInt = parseInt(priceNumber);
            productsPrice.push(priceInt);
        }
    
        for (const price of productsPrice) { 
            if (price < minPrice) { 
                return false;
            }
        }
        return true;
    }
    /**
     * Navigate to next page
     */
    async navigateToNextPage(){
        await this.$nextPage().scrollIntoView();
        await this.$nextPage().click();
        await this.$pageNumber().scrollIntoView();
    }
    /**
     * To select a product
     */
    async selectProduct(){
        await this.$productSelected().scrollIntoView();
        await this.$productSelected().click();
    }

}
export default new Productpage();