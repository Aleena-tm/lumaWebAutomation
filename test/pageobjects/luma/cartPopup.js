import Common from "../luma/common.js";


class Cartpopup extends Common{
    constructor(){
        super();
        this.$cartPopup=()=>$(`//div[@data-block="minicart"]`);
        this.$productNameInCartPopup=()=>$(`//strong[@class="product-item-name"]//a`);
        this.$productPriceInCartPopup=()=>$(`//span[@class="minicart-price"]`);
        this.$subtotal=()=>$(`//div[@class="subtotal"]//span[@class="price"]`);
        this.$viewCart=()=>$(`//span[.="View and Edit Cart"]`);
        this.$cartProducts=data=>$(`(//strong[@class="product-item-name"])[${data}]`);
        this.$popupMessage=()=>$(`(//div[@id="google-anno-sa"]//*[name()='svg'])[last()]`);
    }

    /**
     * To validate the product details in mini cart
     * @returns string
     */
    async validateCartPopup(){
            let cartDetails=[];
            await this.scrollAndClick(this.$cartPopup());
             cartDetails = await Promise.all([
                this.$productNameInCartPopup().getText(),
                this.$productPriceInCartPopup().getText(),
                this.$subtotal().getText()
            ]);
            return cartDetails; 
        }

    /**
     * To move to cart page.
     */
    async moveToCartPage(){
        if(await this.$popupMessage().isDisplayed()){
            await this.clickElemenets(this.$popupMessage());
            await this.scrollAndClick(this.$viewCart());
        }else{
            await this.scrollAndClick(this.$viewCart());
        }
    }
}
 export default new Cartpopup();