// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {addMatchImageSnapshotCommand} from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand({
    //Nivel de tolenrancia al fallo
    failureThreshold: 0.03,
    failureThresholdType: "percent",
    customDiffConfig: { threshold:0.1 },
    capture: "viewport"

})

Cypress.Commands.add("login", (email,password)=>{
    const userInput = "#user_login";
    const passwordInput = "#user_password";
    const loginButton = "#login_form > div.form-actions > input";

    cy.visit("http://zero.webappsecurity.com/login.html")

    cy.get(userInput).type(email)
    cy.get(passwordInput).type(password, { sensitive : true } )
    cy.get(loginButton).click()
})

Cypress.Commands.overwrite("type", (originaFn, element, text, options)=>{
    
    if (options && options.sensitive) {
        options.log = false

        Cypress.log({
            $el: element,
            name: "type",
            message: "*".repeat(text.length)
        })
    }

    return originaFn(element,text,options)
})