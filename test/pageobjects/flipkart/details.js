import Common from '../flipkart/common.js'

class ProductDetails extends Common{
    constructor(){
        super();
        this.$productPageHeader =()=>$(`//img[@title="Flipkart"]`);
        this.$addToCart =()=>$(`//button[@class="QqFHMw vslbG+ In9uk2"]`);
    }
    /**
     * To add the selected product to cart
     */
    async addProductToCart(){
        await this.$addToCart().scrollIntoView();
        await this.$addToCart().click();
    }
}

export default new ProductDetails();