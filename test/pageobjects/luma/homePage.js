import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class Homepage extends Common{
    constructor(){
        super();
        this.$category=data=>$(`//span[text()="${data}"]`);
        this.$subCategory=data=>$(`//li[contains(@class,"${data}")]`);
        this.$product=data=>$(`//li[contains(@class,"${data}")]`);
        this.$productsPageHeader=()=>$(`//span[@data-ui-id="page-title-wrapper"]`);
    }


    /**
     * To search for a product for women
     */
    async searchWomenProduct(){
        await this.hover(this.$category(userData.categoryWomen));
        await this.hover(this.$subCategory(userData.top));
        await this.clickElemenets(this.$product(userData.jacket));
    }

    /**
     * To search for a product for men
     */
    async searchMenProduct(){
        await this.hover(this.$category(userData.categoryMen));
        await this.hover(this.$subCategory(userData.bottom));
        await this.clickElemenets(this.$product(userData.pant));
        
    }

    /**
     * To search for a product from gear category
     */
    async searchGearProduct(){
        await this.hover(this.$category(userData.categoryGear));
        await this.clickElemenets(this.$product(userData.bag));
        
    }

     /**
     * To search for a jacket for men
     */
     async searchMenAnotherProduct(){
        await this.$category(userData.categoryMen).scrollIntoView();
        await this.hover(this.$category(userData.categoryMen));
        await this.hover(this.$subCategory(userData.topMen));
        await this.clickElemenets(this.$product(userData.jacketMen));
        
    }

    /**
     * To select My Account option from the dropdown
     */
    async selectMyAccount(){
        await this.scrollAndClick(this.$profileName(userData.indexNumbers[0]));
        await this.$myAccount(userData.indexNumbers[0]).waitForDisplayed({timeout:5000, timeoutMsg:"My account option should be displayed"});
        await this.scrollAndClick(this.$myAccount(userData.indexNumbers[0]));
    }

}

export default new Homepage;