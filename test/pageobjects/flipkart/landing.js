import Common from '../example/common.js'
class Landingpage extends Common{
    constructor(){
        super();
        this.$validateHeader =()=> $(`//img[@title="Flipkart"]`);
        this.$chooseChategory =()=>$(`//span[text()="Mobiles"]`);
    }
    /**
     * To choose a category
     */
    async selectProduct(){
        await this.$chooseChategory().click();
    }
}
export default new Landingpage();