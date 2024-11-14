import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class MyAccountPage extends Common{
    constructor(){
        super();
        this.$myAccountHeader=()=>$(`//span[.="My Account"]`);
        this.$edit=()=>$(`//span[.="Edit"]`);
        this.$changeEmail=()=>$(`//input[@id="change-email"]`);
        this.$currentPassword=()=>$(`//input[@id="current-password"]`);
        this.$save=()=>$(`//button[@class="action save primary"]`);
        this.$customerLogin=()=>$(`//span[.="Customer Login"]`);
        this.$createAnAccount=()=>$(`//a[@class="action create primary"]`);
        this.$editAddress=()=>$(`//span[.="Manage Addresses"]`);
        this.$addNewAddress=()=>$(`//span[.="Add New Address"]`);
        this.$enternewDetails=index=>$(`(//input[@type="text"])[${index}]`);
        this.$saveAddress=()=>$(`//button[@class="action save primary"]`);
        this.$myOrder=()=>$(`//a[.="My Orders"]`);
        this.$myOrderHeader=()=>$(`//span[.="My Orders"]`);
        this.$viewOrder=index=>$(`(//span[.="View Order"])[${index}]`);
        this.$orderedProduct=()=>$(`//strong[@class="product name product-item-name"]`);
        this.$reorder=()=>$(`//span[.="Reorder"]`);
    }

    /**
     * To click on edit option
     */
    async editContact(){
        await this.scrollAndClick(this.$edit());
        await this.$changeEmail().waitForDisplayed({timeout:5000, timeoutMsg:"The checkbox should be visible"});
        await this.scrollAndClick(this.$changeEmail());
        await this.$currentPassword().waitForDisplayed({timeout:5000, timeoutMsg:"The current password field should be visible"});
        await this.$currentPassword().setValue(userData.password_);
        await this.scrollAndClick(this.$save());
        await this.$customerLogin().waitForDisplayed({timeout:5000, timeoutMsg:"The customer login button should be displayed"});
    }

    /**
     * 
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} password 
     * @param {string} confirmPassword 
     * @returns string
     */
    async createNewAccount(firstname, lastname, password, confirmPassword) {
            await this.scrollAndClick(this.$createAnAccount());
            let emailPrefix = Math.floor(Math.random() * 1000);
            this.userEmail = `edkl${emailPrefix}@gmail.com`;
        
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
     * To add a new address
     */
    async changeAddress(){
        await this.scrollAndClick(this.$editAddress());
        await this.$addNewAddress().waitForDisplayed({timeout:5000, timeoutMsg:"New address page should be displayed"});
        await this.$enternewDetails(userData.indexNumbers[8]).setValue(userData.new_number);
        await this.$enternewDetails(userData.indexNumbers[4]).setValue(userData.new_address);
        await this.$enternewDetails(userData.indexNumbers[5]).setValue(userData.new_city);
        await this.clickElemenets(this.$selectStateAndCountry(userData.states[0]));
        await this.clickElemenets(this.$stateAndCountry(userData.stateAndCountry[0]));
        await this.$enternewDetails(userData.indexNumbers[6]).setValue(userData.new_zip);
        await this.clickElemenets(this.$selectStateAndCountry(userData.states[1]));
        await this.clickElemenets(this.$stateAndCountry(userData.stateAndCountry[1]));
        await this.scrollAndClick(this.$saveAddress());
        await this.$myOrder().waitForDisplayed({timeout:5000, timeoutMsg:"My orders should be displayed"});
    }

    /**
     * To click on my order
     */
    async clickMyOrder(){
        await this.scrollAndClick(this.$myOrder());
        await this.$myOrderHeader().waitForDisplayed({timeout:5000, timeoutMsg:"My orders page should be loaded"});
    }

    /**
     * To view the ordered product
     */
    async viewOrder(){
        await this.scrollAndClick(this.$viewOrder(userData.indexNumbers[0]));
        await this.$orderedProduct().waitForDisplayed({timeout:5000, timeoutMsg:"Product name should be displayed"});
    }

    /**
     * To reorder the product
     */
    async reorderProduct(){
        await this.scrollAndClick(this.$reorder());
        await this.$cartHeader().waitForDisplayed({timeout:5000, timeoutMsg:"User is navigated to the cart page"});
    }


}

export default new MyAccountPage();