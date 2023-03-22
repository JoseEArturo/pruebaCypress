const {
    Given,
    When,
    Then
} = require("@badeball/cypress-cucumber-preprocessor")
const {loginPage} = require("../../../PageObjects/LoginPage")
const { navigationPage } = require("../../../PageObjects/navigationPage")

Given(/^I am on the home page$/, function(){
    loginPage.validateSuccessLogin()
})

When(/^I click on the Account Activity Nav$/, function() {
    navigationPage.clickAccountActivity()
})

Then(/^I should see the Account Activity content$/, function(){
    navigationPage.clickShowTransactions()
})