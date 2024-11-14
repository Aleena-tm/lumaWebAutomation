/**
 * imports
 */
import landingPage from "../pageobjects/luma/landing.js";
import homePage from "../pageobjects/luma/homePage.js";
import productsPage from "../pageobjects/luma/productsPage.js";
import userData from "../testData/lumaData.json";
import productDetailsPage from "../pageobjects/luma/productDetails.js";
import cartPopupPage from "../pageobjects/luma/cartPopup.js";
import cartPage from "../pageobjects/luma/cartPage.js";
import checkoutPage from "../pageobjects/luma/checkout.js";
import myAccountPage from "../pageobjects/luma/myAccountPage.js";

let password, filterOption, isSorted, productNames,errorMessage, passwordStrength, nameOfProduct, priceOfProduct, productName, productPrice, value;
let cartQuantity, nameMiniCart, priceMiniCart, totalMiniCart;
let productQuantity = userData.quantities[1];
let productColor = userData.filterOptionsColor[0];
let productSize = userData.filterOptionsSize[1];
let errorMessages =[errorMessage, passwordStrength];
let nameAndPrice =[nameOfProduct, priceOfProduct];
let productDetails =[productName, productPrice];
let detailsOfCartPopup =[nameMiniCart, priceMiniCart, totalMiniCart];
let cartPageDetails =[];
let shippingProductDetails =[];
let wishListnameAndPrice=[];

describe("End to end workflow for Luma", () => {
  it("Load URL of the webpage and the icon of luma should be displayed", async () => {
    await landingPage.loadURL();
    expect(await landingPage.$lumaIcon().isDisplayed())
      .withContext("Expected page should be loaded")
      .toBeTrue();
  });

  it("Verify that the user can create an account only by entering mandatory details and validate the error message", async () => {
    await landingPage.toVerifycreateAccount();
    expect(await landingPage.$enterMandatoryDetails().isDisplayed())
      .withContext("Error message should be displayed")
      .toBeTrue();
  });

  it("Verify that the Email field only takes valid input data and validate the error message", async () => {
    await landingPage.toVerifyValidEmail(
      userData.first_name,
      userData.last_name,
      userData.invalid_email
    );
    expect(await landingPage.$enterValidEmail().isDisplayed())
      .withContext("Error message should be displayed")
      .toBeTrue();
  });

  it("Verify the strength of the password field and validate the error messages", async () => {
    for (password of userData.password_list) {
    errorMessages = await landingPage.validatePassword(password);
      if (passwordStrength === "weak") {
        expect(await landingPage.$passwordStrength().isDisplayed())
          .withContext(`Password strength should be strong`)
          .toBeTrue();
        expect(errorMessage)
          .toSatisfy(
            (msg) =>
              msg.includes("minimum length") ||
              msg.includes("different classes of characters")
          )
          .withContext(`Error message should be displayed`);
      } else if (passwordStrength === "medium") {
        expect(await landingPage.$passwordStrength().isDisplayed())
          .withContext(`Password strength should be medium`)
          .toBeTrue();
      } else {
        expect(await landingPage.$passwordStrength().isDisplayed())
          .withContext(`Password strength should be strong`)
          .toBeTrue();
      }
    }
  });

  it("Create an account for the user and validate the success message", async () => {
    await landingPage.createAccount(
      userData.first_name,
      userData.last_name,
      userData.password_,
      userData.confirm_password
    );
    expect(await landingPage.$successMessage().isDisplayed())
      .withContext("User should be registered")
      .toBeTrue();
  });

  it("User should sign out and validate the signed out message", async () => {
    await landingPage.userSignout();
    expect(await landingPage.$signoutMessage().isDisplayed())
      .withContext("User should be signed out")
      .toBeTrue();
  });

  it("User should sign in using existing credentials and validate the sign in message", async () => {
    await landingPage.userSignin(userData.password_);
    expect(await landingPage.$siginMessage().isDisplayed())
      .withContext("User should signed in")
      .toBeTrue();
  });

  it("User should search for a product from men category at the navigation bar and validate products page header", async () => {
    await homePage.searchMenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  });

  it("User should search for a product from gear category at the navigation bar and validate products page header", async () => {
    await homePage.searchGearProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  });

  it("User should search for a product from women category at the navigation bar and validate products page header", async () => {
    await homePage.searchWomenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  });

  it("User should filter products according to style and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsListStyle) {
      await productsPage.selectFilterStyle(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext(`Product page should be displayed for the selected filter`)
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to size and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsSize) {
      await productsPage.selectFilterSize(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to climate and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsClimate) {
      await productsPage.selectFilterClimate(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to color and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsColor) {
      await productsPage.selectFilterColor(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to eco collection and validate the selected filter option", async () => {
    await productsPage.selectFilterEcoCollection();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to erin recommends and validate the selected filter option", async () => {
    await productsPage.selectFilterErinRecommends();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to material and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsMaterial) {
      await productsPage.selectFilterMaterial(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to new and validate the selected filter option", async () => {
    await productsPage.selectFilterNew();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to pattern and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsPattern) {
      await productsPage.selectFilterPattern(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to performance fabric and validate the selected filter option", async () => {
    await productsPage.selectFilterPerformanceFabric();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to price and validate the selected filter option", async () => {
    await productsPage.selectFilterPrice();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to sale and validate the selected filter option", async () => {
    await productsPage.selectFilterSale();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to all the filter options validate the filter options selected", async () => {
    await productsPage.selectAllFilters();
    expect(await productsPage.$filtersChoosed().isDisplayed())
      .withContext(
        "Product page should be displayed for all the selected filter"
      )
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("Verify the user can sort the products according to the product name and validate the names are sorted or not", async () => {
    isSorted = await productsPage.sortByNames();
    expect(isSorted)
      .withContext("Product names should be sorted in ascending order")
      .toBeTrue();
  });

  it("Verify the user can sort the products according to the price and validate the prices are sorted or not", async () => {
    isSorted = await productsPage.sortByPrice();
    expect(isSorted)
      .withContext("Products should be sorted according to price")
      .toBeTrue();
  });

  it("Verify the user can sort the products according to position", async () => {
    productNames = await productsPage.sortByPosition();
    expect(productNames)
      .withContext("Products should be sorted according to position")
      .toEqual(userData.nameOfProducts);
  });

  it("Verify the functionality of the view mode: List view", async () => {
    value = await productsPage.setListView();
    expect(value)
      .withContext("Products should be viewed as List view")
      .toContain("active");
  });

  it("Verify the functionality of the view mode: Grid view", async () => {
    value = await productsPage.setGridView();
    expect(value)
      .withContext("Products should be viewed as Grid view")
      .toContain("active");
  });

  it("Verify the product details: size and color of a product present on the product page", async () => {
    nameAndPrice= await productsPage.validateProductPageDetails();
    expect(await productsPage.$sizeOptions(1).isDisplayed())
      .withContext("Size options should be displayed")
      .toBeTrue();
    expect(await productsPage.$colorOptions(1).isDisplayed())
      .withContext("Color options should be displayed")
      .toBeTrue();
  });

  it("verify the product details: add to cart option, add to wishlist option, add to compare option are present on the product page", async()=>{
    expect(await productsPage.$addToCart(1).isDisplayed())
      .withContext("Add to cart option should be displayed")
      .toBeTrue();
    expect(await productsPage.$addToWishList(1).isDisplayed())
      .withContext("Add to wishlist option should be displayed")
      .toBeTrue();
    expect(await productsPage.$addToCompare(1).isDisplayed())
      .withContext("Add to compare options should be displayed")
      .toBeTrue();
  });

  it("Verify the details: name and parice of a product present on the product details page is same as product page", async () => {
    productDetails= await productDetailsPage.validateProductDetailsPage();
    expect(productName)
      .withContext("Product names should be same")
      .toEqual(nameOfProduct);
    expect(productPrice)
      .withContext("Product prices should be same")
      .toEqual(priceOfProduct);
  });

    it("Verify the product details: size and color present on the product details page", async ()=>{
    expect(await productDetailsPage.$sizeOptions(1).isDisplayed())
      .withContext("Size options should be displayed")
      .toBeTrue();
    expect(await productDetailsPage.$colorsList(1).isDisplayed())
      .withContext("Color options should be displayed")
      .toBeTrue();
    });

    it("Verify the product details: add to cart option, add to wishlist option, add to compare option are present on the product details page", async()=>{
    expect(await productDetailsPage.$addToCart(1).isDisplayed())
      .withContext("Add to cart option should be displayed")
      .toBeTrue();
    expect(await productDetailsPage.$addToWishList(1).isDisplayed())
      .withContext("Add to wishlist option should be displayed")
      .toBeTrue();
    expect(await productDetailsPage.$addToCompare(1).isDisplayed())
      .withContext("Add to compare option should be displayed")
      .toBeTrue();
  });

  it("Verify the error message when product is added to cart without selecting size and color", async()=>{
    await productDetailsPage.validateAddToCart()
    expect(await productDetailsPage.$errorMessage().isDisplayed())
      .withContext("Error message should be displayed")
      .toBeTrue(); 
  });

  it("Verify adding product to the cart, by selecting the size, color and quantity of the product", async()=>{
    cartQuantity= await productDetailsPage.addProductToCart()
    expect(cartQuantity)
      .withContext("Products quantity on the should be same as the selected")
      .toEqual(productQuantity);
  });

  it("Verify the product details: name and price on the cart popup", async()=>{
    detailsOfCartPopup=await cartPopupPage.validateCartPopup();
    expect(nameMiniCart)
      .withContext("Product name should be same")
      .toEqual(nameOfProduct);
    expect(priceMiniCart)
      .withContext("Product price should be same")
      .toEqual(priceOfProduct);
  })

  it("User should navigate to the cart page and validate the cart page header", async()=>{
    await cartPopupPage.moveToCartPage();
    expect(await cartPage.$cartHeader().isDisplayed())
      .withContext("Cart page should be loaded")
      .toBeTrue();
  })

  it("Verify the product details on the cart page: name and price", async()=>{
    cartPageDetails = await cartPage.validateCartPage();
    expect(cartPageDetails[0])
      .withContext("The product name on the cart page should be same as the name of the product")
      .toEqual(nameAndPrice[0]);
    expect(cartPageDetails[1])
      .withContext("The product price on the cart page should be same as the price of the product")
      .toEqual(nameAndPrice[1]);
  })

  it("Verify the total price and quantity of the product on the cart page", async()=>{
    expect(cartPageDetails[2])
    .withContext("The total price on the cart page should be same as the price on the cart popup")
    .toEqual( detailsOfCartPopup[2]);
    expect(cartPageDetails[3])
    .withContext("The product quantity should be same the quantity of products selected")
    .toEqual(productQuantity);
  })

  it("User should navigate to the checkout page and validate the checkout page header", async()=>{
    await cartPage.moveToCheckoutPage();
    expect(await cartPage.$checkoutHeader().isDisplayed())
      .withContext("User should be navigated to the checkout page")
      .toBeTrue();
  })

  it("User should enter shipping address and navigate to payment page", async()=>{
    await checkoutPage.enterShippingDetails();
    expect(await checkoutPage.$reviewAndPayments().isDisplayed())
      .withContext("User should be navigated to the checkout page")
      .toBeTrue();
  })

  it("Verify the product name, quantity and price on the checkout page", async()=>{
    shippingProductDetails = await checkoutPage.verifyShippingDetails();
    expect(shippingProductDetails[0])
      .withContext("Product names should be same")
      .toEqual(nameAndPrice[0]);
    expect(shippingProductDetails[1])
      .withContext("Product quantities should be same")
      .toEqual(productQuantity);
    expect(shippingProductDetails[2])
      .withContext("Product total price should be same")
      .toEqual(detailsOfCartPopup[2]);
  })

  it("User should place order and validate thankyou page header", async()=>{
    await checkoutPage.placeOrder();
    expect(await checkoutPage.$thankyouPage().isDisplayed())
      .withContext("User should be navigated to the thankyou page")
      .toBeTrue();
  })

  it("User should navigate back to home page after completing checkout and navigate home page icon", async()=>{
    await checkoutPage.continueShopping();
    expect(await checkoutPage.$lumaIcon().isDisplayed())
      .withContext("User should be navigated to the thankyou page")
      .toBeTrue();
  })

  it("User should navigate to a product from home page and validate products page header", async()=>{
    await homePage.searchMenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  })

  it("User should validate product details and add it to the wishlist and validate wishlist page header", async()=>{
    nameAndPrice= await productsPage.validateProductPageDetails();
    await productsPage.addToWishList();
    expect(await productsPage.$wishlistHeader().isDisplayed())
      .withContext("Wishlist page should be displayed")
      .toBeTrue();
  })

  it("Verify the product name and price on the wishlist page", async()=>{
    wishListnameAndPrice = await productsPage.wishListValidationOfProductOne();
    expect(wishListnameAndPrice[0])
      .withContext("Name of the product should be same")
      .toEqual(nameAndPrice[0]);
    expect(wishListnameAndPrice[1])
      .withContext("Name of the product should be same")
      .toEqual(nameAndPrice[1]);

  })

  it("User should search for a product from gear category to add it to the wishlist", async () => {
    await homePage.searchGearProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  });

  it("User should validate product details of another product and add the product to the wishlist", async()=>{
    nameAndPrice= await productsPage.validateProductPageDetails();
    await productsPage.addToWishList();
    expect(await productsPage.$wishlistHeader().isDisplayed())
      .withContext("Wishlist page should be displayed")
      .toBeTrue();
  })

  it("Verify the product name and price of the gear product on the wishlist page", async()=>{
    wishListnameAndPrice = await productsPage.wishListValidationOfProductTwo();
    expect(wishListnameAndPrice[0])
      .withContext("Name of the product should be same")
      .toEqual(nameAndPrice[0]);
    expect(wishListnameAndPrice[1])
      .withContext("Name of the product should be same")
      .toEqual(nameAndPrice[1]);

  })

  it("User should remove a product from the wishlist and validate the empty message", async()=>{
    await productsPage.removeWishlist();
    expect(await productsPage.$emptyMsg().isDisplayed())
      .withContext("Products should be removed from the wishlist")
      .toBeTrue();
  })

  it("User should search for a women product to add it to the cart and validate prodcts page header", async()=>{
    await homePage.searchWomenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  })

  it("User should click add to cart button for the product and navigate to the products details page", async()=>{
    await productsPage.addProductToCart();
    expect(await productDetailsPage.$addedToCartValidation().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should select size and color of product to add it to the cart", async()=>{
    await productDetailsPage.addWomenProductToCart();
    expect(await productDetailsPage.$cartPopup().isDisplayed())
    .withContext("Product should be added to the cart")
    .toBeTrue();
  })

  it("User should select the cart popup and validate ", async()=>{
    await productDetailsPage.selectCartPopup();
    expect(await cartPopupPage.$cartProducts(userData.indexNumbers[0]).isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should delete products from cart", async()=>{
    await productDetailsPage.deleteCart();
    expect(await cartPopupPage.$deletedMsg().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should return back tohome page", async()=>{
    await productDetailsPage.moveToHomePage();
    expect(await homePage.$lumaIcon().isDisplayed())
     .withContext("Product should be added to the cart")
     .toBeTrue();
  })

  it("User should search for a product of different category", async()=>{
      await homePage.searchMenAnotherProduct();
      expect(await homePage.$productsPageHeader().isDisplayed())
        .withContext("Product page should be displayed")
        .toBeTrue();
  })

  it("User should add another category product to the cart", async()=>{
    await productsPage.addMenProductToCart();
    expect(await productDetailsPage.$addedToCartValidation().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should add multiple number of products to the cart", async()=>{
    await productDetailsPage.addProductsForMenToCart();
    expect(await productDetailsPage.$cartPopup().isDisplayed())
      .withContext("Multiple products should be added to the cart")
      .toBeTrue();
  })

  it("User should select cart popup", async()=>{
    await productDetailsPage.selectCartPopup();
    expect(await cartPopupPage.$cartProducts(userData.indexNumbers[0]).isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should delete products from cart", async()=>{
    await productDetailsPage.deleteCart();
    expect(await cartPopupPage.$deletedMsg().isDisplayed())
      .withContext("Message should be displayed")
      .toBeTrue();
  })

  it("User should navigate to a product category for purchasing", async ()=>{
    await homePage.searchWomenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  })

  it("User should add a product to the cart for purchasing", async()=>{
    await productsPage.addNewProductToCart();
    expect(await productsPage.$cartPopup().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should select another product of different category for purchasing", async()=>{
      await homePage.searchMenAnotherProduct();
      expect(await homePage.$productsPageHeader().isDisplayed())
        .withContext("Product page should be displayed")
        .toBeTrue();
  })

  it("User should add another product to the cart for purchasing", async()=>{
    await productsPage.addNewMenProductToCart();
    expect(await productsPage.$cartPopup().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should add the wishlisted product to the cart", async()=>{
    await productsPage.wishlistProductToCart();
    expect(await productsPage.$cartPopup().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should navigate to another product category for purchasing", async ()=>{
    await homePage.searchWomenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  })

  it("User should add a product to the cart for purchasing", async()=>{
    await productsPage.addNewProductToCart();
    expect(await productsPage.$cartPopup().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should click on cart icon and proceed to checkout", async()=>{
    await productsPage.proceedToCheckout();
    expect(await productsPage.$proceedToCheckout().isDisplayed())
      .withContext("Proceed to checkout button should be present inside the cart popup")
      .toBeTrue();
  })

  it("User should edit quantity of products in the cart for purchasing", async()=>{
    await productsPage.editQuantityNumber();
    expect(await checkoutPage.$shippingHeader().isDisplayed())
      .withContext("User is navigated to the Checkout page")
      .toBeTrue();
  })

  it("User should navigate to payment page for purchasing of products", async()=>{
    await checkoutPage.moveToPaymentPage();
    expect(await checkoutPage.$reviewAndPayments().isDisplayed())
      .withContext("User is navigated to the Payment page")
      .toBeTrue();
  })

  it("User should place order to purchase the products", async()=>{
    await checkoutPage.placeOrder();
    expect(await checkoutPage.$thankyouPage().isDisplayed())
      .withContext("User is navigated to the Thankyou page")
      .toBeTrue();
  })
 
  it("User should return back to home page after completing purchase of the products", async()=>{
    await checkoutPage.continueShopping();
    expect(await homePage.$lumaIcon().isDisplayed())
      .withContext("User should be navigated to the home page")
      .toBeTrue();
  })

  it("User should navigate to My Account page", async()=>{
    await homePage.selectMyAccount();
    expect(await myAccountPage.$myAccountHeader().isDisplayed())
      .withContext("User should be navigated to the home page")
      .toBeTrue();
  })

  it("User should edit contact information", async()=>{
    await myAccountPage.editContact();
    expect(await myAccountPage.$customerLogin().isDisplayed())
      .withContext("User should be navigated to the login page")
      .toBeTrue();
  })

  it("User should create new account from the my account page", async()=>{
    await myAccountPage.createNewAccount(userData._first_name,
      userData._last_name,
      userData._password_,
      userData._confirm_password);
    expect(await myAccountPage.$successMessage().isDisplayed())
      .withContext("New account should be created")
      .toBeTrue();
  })

  it("User should edit address from the my account page", async()=>{
    await myAccountPage.changeAddress();
    expect(await myAccountPage.$successMessage().isDisplayed())
      .withContext("New Address should be saved")
      .toBeTrue()
  })

  it("User should sign out to previous account", async () => {
    await landingPage.userSignout();
    expect(await landingPage.$signoutMessage().isDisplayed())
      .withContext("User is not signed out")
      .toBeTrue();
  });

  it("User should sign in using the previous credentials", async () => {
    await landingPage.userSignin(userData.password_);
    expect(await landingPage.$siginMessage().isDisplayed())
      .withContext("User is not signed in")
      .toBeTrue();
  });

  it("User should navigate to my orders", async ()=>{
    await myAccountPage.clickMyOrder();
    expect(await myAccountPage.$myOrderHeader().isDisplayed())
      .withContext("New Address should be saved")
      .toBeTrue()
  })

  it("User should view the previous orders", async()=>{
    await myAccountPage.viewOrder();
    expect(await myAccountPage.$orderedProduct().isDisplayed())
      .withContext("Product name should be displayed")
      .toBeTrue()

  })

  it("User should reorder the previously ordered product", async()=>{
    await myAccountPage.reorderProduct();
    expect(await cartPage.$cartHeader().isDisplayed())
      .withContext("User is navigated to the cart page")
      .toBeTrue()

  })


  

 
  

 


});
