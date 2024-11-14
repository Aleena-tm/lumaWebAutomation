import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class ProductDetailsPage extends Common{
    constructor(){
        super();
        this.$productNameTitle=()=>$(`//h1[@class="page-title"]/span`);
        this.$productPrice=()=>$(`//div[@class="product-info-price"]//span[@class="price"]`);
        this.$colorsList=data=>$(`(//div[contains(@class,"swatch-attribute-options")])[${data}]`);
        this.$errorMessage=()=>$(`(//div[@class="mage-error"])[last()]`);
        this.$size=data=>$(`//div[.="${data}"]`);
        this.$color=data=>$(`//div[@option-label="${data}"]`);
        this.$quantity=()=>$(`//input[@type="number"]`);
        this.$productQuantity=()=>$(`//input[@class="input-text qty"]`);
        this.$cartNumber=()=>$(`//span[@class="counter-number" and text()="3"]`);
        this.$addToCartButton=()=>$(`//button[@id="product-addtocart-button"]`);
        this.$homePage=()=>$(`//a[text()="Home"]`);
        this.$deleteProduct=data=>$(`(//a[@class="action delete"])[${data}]`);
        this.$okMessage=()=>$(`//span[text()="OK"]`);
    }

    /**
     * To validate the product details present on the product details page.
     * @returns string
     */
    async validateProductDetailsPage() {
      await this.scrollAndClick(this.$productName(1));
      await this.$productNameTitle().waitForDisplayed({ timeout: 5000, timeoutMsg: "Product details page should be loaded" });
      let [name, price] = await Promise.all([
          this.$productNameTitle().getText(),
          this.$productPrice().getText()
      ]);
      await this.$addToCartButton().waitForDisplayed({ timeout: 5000, timeoutMsg: "Add to cart should be loaded" });
      return [name, price];
    }
  

    /**
     * To click on Add to cart
     */
    async validateAddToCart(){
      await this.scrollAndClick(this.$addToCartButton());
    }

    /**
     * To add products to the cart
     * @returns number
     */
    async addProductToCart(){
      await this.scrollAndClick(this.$size(userData.sizes[1]));
      await this.scrollAndClick(this.$color(userData.colors[0]));
      await this.$quantity().setValue(userData.quantities[1]);
      await this.clickElemenets(this.$addToCartButton());
      await this.$cartNumber().waitForDisplayed({timeout:5000, timeoutMsg:"Cart number should be displayed"});
      await this.$cartNumber().scrollIntoView();
      let quantity = parseInt(await this.$cartNumber().getText());
      return quantity;
    }

    /**
     * To add women products to the cart
     */
    async addWomenProductToCart(){
      // await this.$size(userData.sizes[1]).waitForClickable({timeout:3000, timeoutMsg:"Button should be displayed"});
      await this.scrollAndClick(this.$size(userData.sizes[1]));
      // await this.$color(userData.colors[0]).waitForClickable({timeout:3000, timeoutMsg:"Button should be displayed"});
      await this.scrollAndClick(this.$color(userData.colors[0]));
      await this.$quantity().setValue(userData.quantities[0]);
      await this.$addToCartButton().waitForClickable({timeout:3000, timeoutMsg:"Button should be displayed"});
      await browser.pause(3000);
      await this.clickElemenets(this.$addToCartButton());
      await browser.pause(3000);
      await this.$cartPopup().waitForDisplayed({timeout:3000, timeoutMsg:"Cart popup should be displayed"});
      await this.$homePage().waitForDisplayed({timeout:5000, timeoutMsg:"Home page button should be displayed"});
    }

    /**
     * To move to home page
     */
    async moveToHomePage(){
      await this.scrollAndClick(this.$homePage());
      await this.$lumaIcon().waitForDisplayed({timeout:5000, timeoutMsg:"Home page should be loaded"});
    }

    /**
     * To add men products to the cart
     */
    async addProductsForMenToCart(){
      await this.scrollAndClick(this.$size(userData.sizes[1]));
      await this.scrollAndClick(this.$color(userData.colors[1]));
      await this.$productQuantity().setValue(userData.quantities[1]);
      await this.$addToCartButton().waitForClickable({timeout:3000, timeoutMsg:"Button should be displayed"});
      await browser.pause(3000);
      await this.clickElemenets(this.$addToCartButton());
      await browser.pause(3000);
      await this.$cartPopup().waitForDisplayed({timeout:3000, timeoutMsg:"Cart popup should be displayed"});
    }

    /**
     * To select the cart popup
     */
    async selectCartPopup(){
      await this.scrollAndClick(this.$cartPopup());
      await browser.pause(3000);
    }

   /**
 * To delete products.
 */
  async deleteCart() {
      await this.clickElemenets(this.$deleteProduct(userData.indexNumbers[0]));
      await this.$okMessage().waitForClickable({ timeout: 3000, timeoutMsg: "ok button should be displayed"});
      await this.scrollAndClick(this.$okMessage());
      await this.$cartPopup().waitForDisplayed({timeout:3000, timeoutMsg:"Popup should be displayed"});
      await browser.pause(3000);
      await this.$deletedMsg().waitForDisplayed({ timeout: 10000, timeoutMsg: "Message should be displayed" });
  }


}
export default new ProductDetailsPage;