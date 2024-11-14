import Common from "../demoblaze/common.js";
import dataForSignup from "../../testData/datas.json" assert {type : 'json'};
class Landingpage extends Common{
    constructor(){
        super();
        this.$validateHeader = ()=>$(`//a[@class="navbar-brand"]`);
        this.$$nameOfProducts =()=> $$(`//div[@class="card-block"]//a`);
        this.$$priceOfProducts = ()=> $$(`//h4[@class="card-title"]/following-sibling::h5`);
        this.$login = ()=> $(`//a[text()="Log in"]`);
        this.$loginHeader =()=>$(`//h5[text()="Log in"]`);
        this.$enterLoginDetails = data =>$(`//input[@id="${data}"]`);
        this.$loginButton =()=>$(`//button[text()="Log in"]`);
        this.$validateLogin =()=>$(`//li//a[@id="nameofuser"]`);
    }

    /**
     * To get the name of products displayed.
     * @returns string
     */
    async productNames(){
        let names = await this.$$nameOfProducts();
        const namesProducts = [];
        for(let i=0; i< names.length; i++){
            const productName = await names[i].getText();
            namesProducts.push(productName);
        }
        return namesProducts;
    }
    
    /**
     * To get the price of the products
     * @returns string
     */
    async productPrices(){
        let prices = await this.$$priceOfProducts();
        const pricesProducts = [];
        for (const element of prices) {
            const productPrice = await element.getText();
            pricesProducts.push(productPrice);
        }
        return pricesProducts;
    }
    /**
     * To click on Login button
     */
    async clickLogin(){
        await this.$login().click();
        await this.$loginHeader().waitForDisplayed({timeout: 5000, timeoutMsg:'Header is not displayed'});
    }
    /**
     * 
     */
    async enterDetails(userName,password){
        await this.$enterLoginDetails(userName).click();
        await this.$enterLoginDetails(dataForSignup.usrnme).setValue(dataForSignup.user);
        await this.$enterLoginDetails(dataForSignup.pswd).click();
        await this.$enterLoginDetails(dataForSignup.pswd).setValue(dataForSignup.pass);
        await this.$loginButton().click();
        await this.$validateLogin().waitForDisplayed({timeout: 5000, timeoutMsg:'Header is not displayed'});
    }
}

export default new Landingpage();