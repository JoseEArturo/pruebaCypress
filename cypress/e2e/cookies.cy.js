Cypress.Cookies.defaults({
    preserve:"nombre",
})

describe('Cookies', () => {

    before(() => {
        cy.clearCookies()
    });

    after(() => {
        cy.clearCookie("nombre")
    });

    it('Obtener cookies', () => {
        cy.visit("/")
        cy.getCookies().should("be.empty")
    });

    it('Agregar una cookie', () => {
        cy.setCookie("nombre","Jose")
        cy.getCookies().should("have.length",1)
       
    });

    it('Obtener una cookie en especifico', () => {
        cy.getCookie("nombre").should("have.a.property", "value", "Jose")
    });
});