import Common from '../flipkart/common.js'

class Cartpage extends Common{
    constructor(){
        super();
        this.$saveForLater=()=>$(`//div[text()="Save for later"]`);
    }
}
export default new Cartpage();