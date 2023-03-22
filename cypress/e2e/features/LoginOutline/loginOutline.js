const {
    Given,
    When,
    Then
} = require("@badeball/cypress-cucumber-preprocessor")
const {loginPage} = require("../../../PageObjects/LoginPage")

Given(/^The user is on the login page$/, function(){
    loginPage.visit()
    loginPage.validateLoginPage()
})

When(/^I fill in the email and password with (.*) and (.*)$/, function (username, password) {
    loginPage.login(username,password)
})

Then(/^I should validate that I am not logged in$/, function () {
    loginPage.validateErrorLogin()
})