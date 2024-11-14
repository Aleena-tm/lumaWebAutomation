export default class Common{
    constructor(){
    }
    /**
     * To load the URL of the website
     */
    async loadUrl(){
        await browser.maximizeWindow();
        await browser.url(`https://www.demoblaze.com/`);
    }
}