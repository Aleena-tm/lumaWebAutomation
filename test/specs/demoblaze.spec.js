import landingPage from "../pageobjects/demoblaze/landing.js";
import productList from "../testData/datas.json" assert { type: "json" };

describe(`Sample workflow of Demoblaze`, () => {
  it(`Load URL of the website`, async () => {
    await landingPage.loadUrl();
    expect(await landingPage.$validateHeader().isDisplayed())
      .withContext("Expected page should be loaded")
      .toBeTrue();
  });

  it(`The user should be able to sign up for the website`, async () => {
    await landingPage.clickLogin();
    expect(await landingPage.$loginHeader().isDisplayed())
      .withContext("Expected header is not displayed")
      .toBeTrue();
  });

  it(`The user should enter username`, async () => {
    await landingPage.enterDetails();
    expect(await landingPage.$validateLogin().isDisplayed())
      .withContext("Expected user is not logged in")
      .toBeTrue();
  });

  it(`Validate the displayed product list on the landing page`, async () => {
    const listOfProducts = await landingPage.productNames();
    let index = 0;
    for (let name of listOfProducts) {
      expect(name)
        .withContext(
          `Actual product at index ${index} is not equal to expected product: '${productList.productNameList[index]}'`
        )
        .toEqual(productList.productNameList[index]);
      index++;
    }
  });

  it(`Validate the price of each product displayed on the landing page`, async () => {
    const priceListOfProducts = await landingPage.productPrices();
    let index = 0;
    for (let price of priceListOfProducts) {
      expect(price)
        .withContext(
          `Actual price at index ${index} is not equal to expected price: '${productList.priceList[index]}'`
        )
        .toEqual(productList.priceList[index]);
      index++;
    }
  });
});
