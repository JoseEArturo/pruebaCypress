Feature: Navigation Bar

Background:
    Given I am on the login page
    And I fill in the email and password with "username" and "password"

Scenario: Navigate to the Feature Navigation Bar
        Given I am on the home page
        When I click on the Account Activity Nav
        Then I should see the Account Activity content