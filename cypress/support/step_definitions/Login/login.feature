Feature: Login
    Scenario: Login with validate credentials
        Given I am on the login page
        When I fill in the email and password with "username" and "password"
        Then I should validate that I am logged in