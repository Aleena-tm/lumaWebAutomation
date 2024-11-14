import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class Productspage extends Common{
    constructor(){
        super();
        this.$filterOption = data=>$(`//div[@class="filter-options-title" and text()="${data}"]`);
        this.$chooseFilterList =data=>$(`//a[normalize-space(text())="${data}"]`);
        this.$chooseFilterBox=data=>$(`//div[@class="filter-options-content"]//div[@option-label="${data}"]`);
        this.$chooseFilters =data=>$(`(//li[@class="item"]//a)[${data}]`);
        this.$selectMultipleFilters=(data,index)=>$(`(//a[contains(text(), "${data}")])[${index}]`);
        this.$clearFilter =()=>$(`//span[.="Clear All"]`);
        this.$clearFilterValidation=()=>$(`//h1/span[.="Jackets"]`);
        this.$filterHeader=()=>$(`//span[@class="filter-label"]`);
        this.$filtersChoosed=()=>$(`(//ol[@class="items"])[1]`);
        this.$sortBy=()=>$(`(//select[@class="sorter-options"])[1]`);
        this.$sortByOptions=data=>$(`(//option[normalize-space()="${data}"])[1]`);
        this.$$productsSortedByNames=()=>$$(`//div[contains(@class,"product details")]//a[@class="product-item-link"]`);
        this.$$productsSortedByPrice=()=>$$(`//div[contains(@class,"product details")]//span[@class="price"]`);
        this.$productPrice=data=>$(`(//div[contains(@class,"product details")]//span[@class="price"])[${data}]`);
        this.$$sortByPosition=()=>$$(`//a[@class="product-item-link"]`);
        this.$productPosition=data=>$(`(//a[@class="product-item-link"])[${data}]`);
        this.$viewModes=data=>$(`(//a[contains(@class,"${data}")])[1]`);
        this.$validateViewModes=data=>$(`(//strong[contains(@class,"${data}")])[1]`);
        this.$productPrice=data=>$(`(//span[@class="price"])[${data}]`);
        this.$wishlistHeader=()=>$(`//span[text()="My Wish List"]`);
        this.$wishListProductName=data=>$(`(//strong[@class="product-item-name"]/a)[${data}]`);
        this.$wishListProductPrice=data=>$(`(//span[@class="price-wrapper "]/span)[${data}]`);
        this.$removeItemWishlist=()=>$(`(//a[@title="Remove This Item"])[last()]`);
        this.$emptyMsg=()=>$(`//div[@data-ui-id="message-success"]`);
        this.$sizeOfProduct=(data,index)=>$(`(//div[.="${data}"])[${index}]`);
        this.$colorOfProduct=(data,index)=>$(`(//div[@option-label="${data}"])[${index}]`);
        this.$cartProductNumber=()=>$(`//span[@class="counter-number"]`);
        this.$proceedToCheckout=()=>$(`//button[@title="Proceed to Checkout"]`);
        this.$addToCartProduct=index=>$(`(//button[@class="action tocart primary"])[${index}]`);
        this.$addProductToCart=index=>$(`(//form[@data-role="tocart-form"])[${index}]`);
        this.$editQuantity=index=>$(`(//div[@class="product-item-pricing"]//input[@class="item-qty cart-item-qty"])[${index}]`);
        this.$updateQuantity=index=>$(`(//span[text()="Update"])[${index}]`);
        this.$myWishlistSelect=index=>$(`(//li[@class="link wishlist"]//a)[${index}]`);
        this.$wishToCart=()=>$(`(//button[@class="action tocart primary"]//span)[last()]`);
    }

    /**
     * To click clear filter
     */
    async clearFilter(){
      await this.clickElemenets(this.$clearFilter());
      await this.$clearFilterValidation().waitForDisplayed({timeout:5000, timeOutMsg:"Selected filters are not cleared"})
    }

    /**
    * To select style filter option
    */
    async selectFilterStyle(filterOption) {
      await this.scrollAndClick(this.$filterOption(userData.filterOptions[0]));
      await this.scrollAndClick(this.$chooseFilterList(filterOption));
      await this.$filterHeader().waitForDisplayed({ timeout: 5000, timeOutMsg: "Product is not filtered" });
      await this.$clearFilter().waitForDisplayed({ timeout: 5000, timeOutMsg: "Clear filter option is not present" });
      }


    /** 
     * To select size filter option
    */
    async selectFilterSize(filterOption)
        {
           await this.scrollAndClick(this.$filterOption(userData.filterOptions[1])); 
           await this.scrollAndClick(this.$chooseFilterBox(filterOption));
           await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
           await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
        }

   /**
    * To select climate filter option
    */
   async selectFilterClimate(filterOption)
    {
       await this.scrollAndClick(this.$filterOption(userData.filterOptions[2])); 
       await this.scrollAndClick(this.$chooseFilterList(filterOption));
       await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
       await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
   }

   /**
    * To select color filter option
    */
   async selectFilterColor(filterOption)
    {
       await this.scrollAndClick(this.$filterOption(userData.filterOptions[3])); 
       await this.scrollAndClick(this.$chooseFilterBox(filterOption));
       await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
       await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
   }

   /**
    * To select eco collection filter option
    */
   async selectFilterEcoCollection() 
    {
       await this.scrollAndClick(this.$filterOption(userData.filterOptions[4])); 
       await this.scrollAndClick(this.$chooseFilters(userData.filterOptionsList[0]));
       await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
       await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"}); 
    }

    /**
    * To select erin recommend filter option
    */
   async selectFilterErinRecommends() 
   {
      await this.scrollAndClick(this.$filterOption(userData.filterOptions[5])); 
      await this.scrollAndClick(this.$chooseFilters(userData.filterOptionsList[1]));
      await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
      await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
   }

   /**
    * To select Material filter option
    */
   async selectFilterMaterial(filterOption) 
   {
      await this.scrollAndClick(this.$filterOption(userData.filterOptions[6])); 
      await this.scrollAndClick(this.$chooseFilterList(filterOption));
      await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
      await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
   }

   /**
    * To select New filter option
    */
   async selectFilterNew() 
   {
      await this.scrollAndClick(this.$filterOption(userData.filterOptions[7])); 
      await this.scrollAndClick(this.$chooseFilters(userData.filterOptionsList[2]));
      await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
      await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
   }

   /**
    * To select Pattern filter option
    */
   async selectFilterPattern(filterOption) 
   {
      await this.scrollAndClick(this.$filterOption(userData.filterOptions[8])); 
      await this.scrollAndClick(this.$chooseFilterList(filterOption));
      await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
      await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
   }

   /**
    * To select Performance fabric filter option
    */
   async selectFilterPerformanceFabric() 
   {
      await this.scrollAndClick(this.$filterOption(userData.filterOptions[9])); 
      await this.scrollAndClick(this.$chooseFilters(userData.filterOptionsList[3]));
      await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
      await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
   }

   /**
    * To select Price filter option
    */
   async selectFilterPrice() 
   {
      await this.scrollAndClick(this.$filterOption(userData.filterOptions[10])) 
      await this.scrollAndClick(this.$chooseFilters(userData.filterOptionsList[4]));
      await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
      await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
   }

   /**
    * To select sale filter option
    */
   async selectFilterSale() 
   {
      await this.scrollAndClick(this.$filterOption(userData.filterOptions[11])); 
      await this.scrollAndClick(this.$chooseFilters(userData.filterOptionsList[5]));
      await this.$filterHeader().waitForDisplayed({timeout: 5000, timeOutMsg: "Product is not filtered"});
      await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
   }

   /**
    * To select product by selecting different filter options
    */
   async selectAllFilters(){
      await this.scrollAndClick(this.$filterOption(userData.filterOptions[0]));
      await this.scrollAndClick(this.$chooseFilterList(userData.filterOptionsListStyle[0]));

      await this.scrollAndClick(this.$filterOption(userData.filterOptions[1])); 
      await this.scrollAndClick(this.$chooseFilterBox(userData.filterOptionsSize[0]));

      await this.scrollAndClick(this.$filterOption(userData.filterOptions[2])); 
      await this.scrollAndClick(this.$selectMultipleFilters(userData.filterOptionsClimate[0],userData.indexNumbers[0]));

      await this.scrollAndClick(this.$filterOption(userData.filterOptions[3])); 
      await this.scrollAndClick(this.$chooseFilterBox(userData.filterOptionsColor[0]));

      await this.scrollAndClick(this.$filterOption(userData.filterOptions[4])); 
      await this.scrollAndClick(this.$selectMultipleFilters(userData.yesOrNoOptions[1],userData.indexNumbers[0]));

      await this.scrollAndClick(this.$filterOption(userData.filterOptions[5])); 
      await this.scrollAndClick(this.$selectMultipleFilters(userData.yesOrNoOptions[1],userData.indexNumbers[0]));

      await this.$filterOption(userData.filterOptions[6]).click(); 
      await this.scrollAndClick(this.$selectMultipleFilters(userData.filterOptionsMaterial[2],userData.indexNumbers[0]));

      await this.$filterOption(userData.filterOptions[8]).click(); 
      await this.scrollAndClick(this.$selectMultipleFilters(userData.filterOptionsPattern[1],userData.indexNumbers[0]));

      await this.$filterOption(userData.filterOptions[9]).click(); 
      await this.scrollAndClick(this.$selectMultipleFilters(userData.yesOrNoOptions[1],userData.indexNumbers[1]));
     
      await this.$filtersChoosed().scrollIntoView();
      await this.$filtersChoosed().waitForDisplayed({timeout: 5000, timeoutMsg: "Product is not filtered"});
      await this.$clearFilter().waitForDisplayed({timeout: 5000, timeOutMsg: "Clear filter option is not present"});
      await this.$sortBy().waitForDisplayed({timeout:5000,timeoutMsg:"Sort By option is not present"});
   }

   /**
    * To validate the product names are sorted in ascending order
    * @returns boolean
    */
   async sortByNames(){
      await this.$sortBy().click();
      await this.$sortByOptions(userData.sortingOptions[0]).waitForDisplayed({timeout:5000,timeoutMsg:"Product name option is not present"});
      await this.$sortByOptions(userData.sortingOptions[0]).scrollIntoView();
      await this.$sortByOptions(userData.sortingOptions[0]).click();
      let productNames = [];
      let productLength = await this.$$productsSortedByNames().length;
     
      for (let i = 0; i < productLength; i++) { 
         let productText = await this.$productName(i + 1).getText(); 
         productNames.push(productText); 
      }
      let isSorted = true;
      for (let i = 0; i < productLength - 1; i++) {
         if (productNames[i] > productNames[i + 1]) {
            isSorted = false;
            break;
          }
      }
      await this.$sortBy().waitForDisplayed({timeout:5000,timeoutMsg:"Sort By option is not present"});
      return isSorted;
     }

     /**
      * To sort products according to price
      * @returns boolean
      */
     async sortByPrice(){
      await this.$sortBy().click();
      await this.$sortByOptions(userData.sortingOptions[1]).waitForDisplayed({timeout:5000,timeoutMsg:"Product name option is not present"});
      await this.$sortByOptions(userData.sortingOptions[1]).scrollIntoView();
      await this.$sortByOptions(userData.sortingOptions[1]).click();
      let productPrices = [];
      let productLength = await this.$$productsSortedByPrice().length;
      for (let i = 0; i < productLength; i++) { 
         let productText = await this.$productPrice(i + 1).getText(); 
         let price = parseFloat(productText.replace('$', '').trim());
         productPrices.push(price);
      }
      let isSorted = true;
      for (let i = 0; i < productLength - 1; i++) {
         if (productPrices[i] > productPrices[i + 1]) {
            isSorted = false;
            break;
          }
      }
      await this.$sortBy().waitForDisplayed({timeout:5000,timeoutMsg:"Sort By option is not present"});
      return isSorted;
     }

     async sortByPosition(){
      await this.$sortBy().click();
      await this.$sortByOptions(userData.sortingOptions[2]).waitForDisplayed({timeout:5000,timeoutMsg:"Product name option is not present"});
      await this.$sortByOptions(userData.sortingOptions[2]).scrollIntoView();
      await this.$sortByOptions(userData.sortingOptions[2]).click();
      let productNames = [];
      let productLength = await this.$$sortByPosition().length;
      for (let i = 0; i < productLength; i++) { 
         let productText = await this.$productPosition(i + 1).getText(); 
         productNames.push(productText); 
      }
      return productNames;
     }

     /**
      * To set the view mode as List view
      * @returns string
      */
     async setListView(){
      await this.scrollAndClick(this.$viewModes(userData.viewModes[0]));
      let value= await this.$validateViewModes(userData.viewModes[0]).getAttribute('class');
      return value;
     }

     /**
      * To set the view mode as Grid view
      * @returns string
      */
     async setGridView(){
      await this.scrollAndClick(this.$viewModes(userData.viewModes[1]));
      let value= await this.$validateViewModes(userData.viewModes[1]).getAttribute('class');
      return value;
     }

     /**
      * To validate details of a product present on the product's page
      * @returns string
      */
     async validateProductPageDetails() {
      await this.hover(this.$productName(userData.indexNumbers[0]));
      let [name, price] = await Promise.all([
          this.$productName(1).getText(),
          this.$productPrice(1).getText()
      ]);
      return [name, price];
      }

      /**
       * To add a product to the wishlist
       */
      async addToWishList(){
       await this.clickElemenets(this.$addToWishList(userData.indexNumbers[0]));
       await this.$wishlistHeader().waitForDisplayed({timeout:5000,timeoutMsg:"Wishlist page should be loaded"});
      }

      /**
       * To validate product name and price on the wishlist page
       * @returns string
       */
      async wishListValidationOfProductOne(){
         let [name, price] = await Promise.all([
            this.$wishListProductName(userData.indexNumbers[0]).getText(),
            this.$wishListProductPrice(userData.indexNumbers[0]).getText()
        ]);
        return [name, price];
      }

       /**
       * To validate product name and price on the wishlist page
       * @returns string
       */
       async wishListValidationOfProductTwo(){
         let [name, price] = await Promise.all([
            this.$wishListProductName(userData.indexNumbers[1]).getText(),
            this.$wishListProductPrice(userData.indexNumbers[1]).getText()
        ]);
        return [name, price];
      }
      
      /**
       * To remove an item from the wishlist
       */
      async removeWishlist(){
         await this.scrollAndClick(this.$removeItemWishlist());
         await this.$emptyMsg().waitForDisplayed({timeout: 5000, timeOutMsg: "Item should be removed"});
      }

      /**
       * To add products to the cart
       */
      async addProductToCart(){
         await this.hover(this.$productName(userData.indexNumbers[3]));
         await this.$addToCart(userData.indexNumbers[3]).waitForDisplayed({timeout:5000, timeoutMsg: "Add to cart button should be displayed"});
         await this.clickElemenets(this.$addToCart(userData.indexNumbers[3]));
         await this.$addedToCartValidation().waitForDisplayed({timeout:10000, timeOutMsg:"Products should be added to cart"});
         await browser.pause(3000);
      }

      /**
       * To add a product to the cart
       */
      async addMenProductToCart(){
         await this.hover(this.$productName(userData.indexNumbers[2]));
         await this.$addToCart(userData.indexNumbers[2]).waitForDisplayed({timeout:5000, timeoutMsg: "Add to cart button should be displayed"});
         await this.clickElemenets(this.$addToCart(userData.indexNumbers[2]));
         await this.$addedToCartValidation().waitForDisplayed({timeout:10000, timeOutMsg:"Products should be added to cart"});
         await browser.pause(3000);
      }

      /**
      * To add a product to the cart from home page.
      */
      async addNewProductToCart() { 
       await this.hover(this.$productName(userData.indexNumbers[6]));
       await this.scrollAndClick(this.$sizeOfProduct(userData.sizes[2], userData.indexNumbers[6]));
       await this.scrollAndClick(this.$colorOfProduct(userData.colors[3], userData.indexNumbers[2]));
       await this.scrollAndClick(this.$addToCartProduct(userData.indexNumbers[6]));
       await this.$cartPopup().waitForDisplayed({timeout:5000, timeOutMsg:"Cart should be updated"});
      }

      /**
       * To click on proceed to checkout
       */
      async proceedToCheckout(){
         await this.clickElemenets(this.$cartPopup());
         await this.$proceedToCheckout().waitForDisplayed({timeout:5000, timeOutMsg:"Button should be displayed"});
      }

      /**
      * To add a product to the cart from home page.
      */
       async addNewMenProductToCart() { 
         await this.hover(this.$productName(userData.indexNumbers[3]));
         await this.scrollAndClick(this.$sizeOfProduct(userData.sizes[2], userData.indexNumbers[3]));
         await this.scrollAndClick(this.$colorOfProduct(userData.colors[0], userData.indexNumbers[2]));
         await this.scrollAndClick(this.$addProductToCart(userData.indexNumbers[3]));
         await this.$cartPopup().waitForDisplayed({timeout:5000, timeOutMsg:"Cart should be updated"});
         await this.$cartPopup().scrollIntoView();
         await this.$profileName(userData.indexNumbers[0]).waitForDisplayed({timeout:5000, timeOutMsg:"Profile name dropdown should be displayed"});
        }

      /**
      * To edit the quantity number of products in the cart
      */
      async editQuantityNumber() {
         let selectedIndexes = userData.indexNumbers.slice(0, 2);
         for (let index of selectedIndexes) {
             await this.$editQuantity(index).waitForDisplayed({ timeout: 5000 });
             await this.scrollAndClick(this.$editQuantity(index));
             await browser.keys(['Control', 'a']);   
             await browser.keys('Backspace');     
             await this.$editQuantity(index).setValue(userData.quantities[0]);
             await this.scrollAndClick(this.$updateQuantity(index));
         }
         await this.scrollAndClick(this.$proceedToCheckout());
     }

     /**
      * To add a product from wishlist to cart
      */
     async wishlistProductToCart(){
      await this.scrollAndClick(this.$profileName(userData.indexNumbers[0]));
      await this.$myWishlistSelect(userData.indexNumbers[0]).waitForDisplayed({timeout:5000,timeOutMsg:"My wishlist option should be present"});
      await this.scrollAndClick(this.$myWishlistSelect(userData.indexNumbers[0]));
      await this.$wishToCart().waitForDisplayed({timeout:5000,timeOutMsg:"Add to cart should be present"});
      await this.scrollAndClick(this.$wishToCart());
     }
     
   }
export default new Productspage();
