import Common from '../flipkart/common.js'

class Productpage extends Common {
    constructor(){
        super();
        this.$validateSearch =()=>$(`//span[text()="phones"]`);
    }
}

export default new Productpage();