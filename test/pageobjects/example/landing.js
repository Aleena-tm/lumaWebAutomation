import Common from '../flipkart/common.js'
import productSearch from '../../testData/flipkartData.json' assert {type : 'json'}

class Landingpage extends Common{
    constructor(){
        super();
        this.$validateHeader =()=> $(`//a//img[@title="Flipkart"]`);
        this.$searchProduct =()=> $(`//input[contains(@title,"Search")]`);
        this.$searchButton =()=> $(`//button[@type="submit"]`);
    }

    async searchProduct(){
        await this.$searchProduct().click();
        await this.$searchProduct().setValue(productSearch.product);
        await this.$searchButton().click();
    }
}

export default new Landingpage();