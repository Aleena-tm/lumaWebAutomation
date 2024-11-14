export default class Common {
    constructor(){
        this.$lumaIcon = () => $(`//a[@class="logo"]`);
        this.$enterDetails = (data) => $(`//input[@name="${data}"]`);
        this.$productName=(data)=>$(`(//a[@class="product-item-link"])[${data}]`);
        this.$sizeOptions=(data)=>$(`(//div[@attribute-code="size"])[${data}]`);
        this.$colorOptions=(data)=>$(`(//div[@aria-label="Color"])[${data}]`);
        this.$addToCart=(data)=>$(`(//span[text()="Add to Cart"])[${data}]`);
        this.$addToWishList=(data)=>$(`(//span[.="Add to Wish List"]/parent::a)[${data}]`);
        this.$addToCompare=(data)=>$(`(//span[.="Add to Compare"]/parent::a)[${data}]`);
        this.$spinner=()=>$(`//img[@src="https://magento.softwaretestingboard.com/pub/static/version1695896754/frontend/Magento/luma/en_US/images/loader-2.gif"]`);
        this.$addedToCartValidation=()=>$(`//h1[@class="page-title"]`);
        this.$cartPopup=()=>$(`//div[@data-block="minicart"]`);
        this.$deletedMsg=()=>$(`//strong[@class="subtitle empty"]`);
        this.$profileName=index=>$(`(//span[@class="customer-name"]//button[@class="action switch"])[${index}]`);
        this.$myAccount=index=>$(`(//li//a[text()="My Account"])[${index}]`);
        this.$submit = () => $(`//button[@title="Create an Account"]`);
        this.$successMessage = () => $(`//div[@data-ui-id="message-success"]`);
        this.$selectStateAndCountry=data=>$(`//select[@name="${data}"]`);
        this.$stateAndCountry=data=>$(`//option[.="${data}"]`);
        this.$cartHeader=()=>$(`//span[.="Shopping Cart"]`);
    }
    /**
     * To load Url of the page.
     */
    async loadURL(){
        await browser.maximizeWindow();
        await browser.url('https://magento.softwaretestingboard.com/');
        // await this.$lumaIcon().waitForDisplayed({timeout:5000, timeoutMsg:"Luma icon should be displayed"});
    }
    
    /**
     * To click an element
     * @param {string} locator 
     */
    async clickElemenets(locator){
        await locator.click();
    }

    /**
     * To scroll and click a locator
     * @param {string} locator 
     */
    async scrollAndClick(locator){
        await locator.scrollIntoView({block: 'center'});
        // await locator.waitForClickable({timeout: 10000, timeoutMsg: "Button is still not loaded"});
        await locator.click();
    }

    /**
     * To hover over a locator
     * @param {string} locator 
     */
    async hover(locator){
        await locator.moveTo();
    }
    
    
}