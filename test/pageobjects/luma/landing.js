import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class Landingpage extends Common {
  constructor() {
    super();
    this.userEmail = null;
    this.$createUserAccount = () => $(`(//a[text()="Create an Account"])[1]`);
    this.$enterMandatoryDetails = () => $(`//div[@id="email_address-error"]`);
    this.$errorMessageForPassword=()=> $(`//div[@id="password-error"]`);
    this.$passwordStrength=()=>$(`//span[@id="password-strength-meter-label"]`);
    this.$enterValidEmail = () => $(`//div[@for="email_address"]`);
    this.$signout = () => $(`(//button[@class="action switch"])[1]`);
    this.$selectSignout = () =>
      $(`(//div[@class="customer-menu"]//a[normalize-space()="Sign Out"])[1]`);
    this.$signoutMessage = () => $(`//span[text()="You are signed out"]`);
    this.$signin = () =>
      $(`//div[@class="panel header"]//a[normalize-space()="Sign In"]`);
    this.$siginButton = () =>
      $(`//fieldset[@class="fieldset login"]//span[text()="Sign In"]`);
    this.$siginMessage = () => $(`//div[@class="panel header"]`);

  }

  /**
   * To verify mandatory fileds
   */
  async toVerifycreateAccount() {
    await this.scrollAndClick(this.$createUserAccount());
    await this.scrollAndClick(this.$submit());
  }

  /**
   * 
   * @param {string} password 
   */
  async validatePassword(password) {
    await this.$enterDetails(userData.password).setValue(password);
    const [errorMessageOfPassword, passwordStrengths] = await Promise.all([
        this.$errorMessageForPassword().getText(),
        this.$passwordStrength().getText()
    ]);
    await this.$enterDetails(userData.password).clearValue(); 
    return [errorMessageOfPassword, passwordStrengths]; 
}


  /**
   * To verify valid email
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} invalid_email
   */
  async toVerifyValidEmail(firstname, lastname, invalid_email) {
    await this.$enterDetails(userData.firstName).setValue(firstname);
    await this.$enterDetails(userData.lastName).setValue(lastname);
    await this.$enterDetails(userData.email).setValue(invalid_email);
    await this.scrollAndClick(this.$submit());
  }

  /**
   * To enter details of a user for creating account.
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} password
   * @param {string} confirmPassword
   */
  async createAccount(firstname, lastname, password, confirmPassword) {
    let emailPrefix = Math.floor(Math.random() * 10000);
    this.userEmail = `exj${emailPrefix}@gmail.com`;

    await this.$enterDetails(userData.firstName).setValue(firstname);
    await this.$enterDetails(userData.lastName).setValue(lastname);
    await this.$enterDetails(userData.email).setValue(this.userEmail);
    await this.$enterDetails(userData.password).setValue(password);
    await this.$enterDetails(userData.confirmPassword).setValue(
      confirmPassword
    );
    await this.scrollAndClick(this.$submit());
    await this.$successMessage().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "User account is not created",
    });

    return this.userEmail;
  }

  /**
   * To sign out the user
   */
  async userSignout() {
    await this.scrollAndClick(this.$signout());
    await this.scrollAndClick(this.$selectSignout());
    await this.$signoutMessage().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "User is not signed out",
    });
  }

  /**
   * To enter sigin credentailas
   * @param {string} password
   */
  async userSignin(password) {
    const emailAddress = this.userEmail;

    await this.scrollAndClick(this.$signin());
    await this.$enterDetails(userData.email_sigin).setValue(emailAddress);
    await this.$enterDetails(userData.password_sigin).setValue(password);
    await this.scrollAndClick(this.$siginButton());
    await this.$siginMessage().waitForDisplayed({
      timeout: 3000,
      timeoutMsg: "User is not signed in",
    });
  }
}

export default new Landingpage();
