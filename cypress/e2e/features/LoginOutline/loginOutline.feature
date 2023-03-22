Feature: Login Outline

    @probando
    Scenario Outline: Login with validate credentials
        Given The user is on the login page
        When I fill in the email and password with <user> and <pass>
        Then I should validate that I am not logged in
        Examples:
            | user      | pass      |
            | username1 | password1 |
            | username2 | password2 |
            | username3 | password3 |
            | username4 | password4 |