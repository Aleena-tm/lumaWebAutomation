import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class Cartpage extends Common{
    constructor(){
        super();
        this.$cartHeader=()=>$(`//span[.="Shopping Cart"]`);
        this.$nameInCart=()=>$(`(//strong[@class="product-item-name"]//a)[last()]`);
        this.$priceInCart=data=>$(`(//span[@class="cart-price"])[${data}]`);
        this.$quantityInCart=()=>$(`//input[@class="input-text qty"]`);
        this.$proceedToCheckout=()=>$(`//button[@title="Proceed to Checkout"]/span[.="Proceed to Checkout"]`);
        this.$checkoutHeader=()=>$(`//div[.="Shipping Address"]`);
    }

    /**
     * To validate the product details in the cart page
     * @returns string
     */
    async validateCartPage() {
        let cartDetails = await Promise.all([
            this.$nameInCart().getText(),
            this.$priceInCart(userData.indexNumbers[0]).getText(), 
            this.$priceInCart(userData.indexNumbers[1]).getText(),
            this.$quantityInCart().getAttribute('value').then(value => parseInt(value))
        ]);
        await this.$proceedToCheckout().waitForDisplayed({timeout:5000, timeoutMsg: "Proceed to checkout button should be present"});
        return cartDetails;
    }
    
    /**
     * To navigate to checkout page
     */
    async moveToCheckoutPage(){
        await this.scrollAndClick(this.$proceedToCheckout());
        await this.$checkoutHeader().waitForDisplayed({timeout:5000, timeoutMsg:"User should be navigated to checkout page"});
    }
}

export default new Cartpage();