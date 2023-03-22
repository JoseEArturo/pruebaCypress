describe('Cookies', () => {

    before(() => {
     //   cy.clearCookies()
    });

    beforeEach(() => {
        cy.session("login", ()=>{
            cy.visit("/")
            cy.setCookie("nombre","Jose")
        })
        
    });

    it('Obtener una cookie en especifico', () => {
        cy.getCookie("nombre").should("have.a.property", "value", "Jose")
    });
});