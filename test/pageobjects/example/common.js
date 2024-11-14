export default class Common{
    constructor(){

    }
    /**
     * Load url of the website
     */
    async loadUrl(){
        await browser.maximizeWindow();
        await browser.url(`https://www.flipkart.com/`);
    }

}