describe('Trabajar con xpaths', () => {
    it('Obtenerlo con un css selector', () => {
        cy.visit("/")
        cy.get("#__next > div > img").should("to.be.visible")
    });

    it('Obtenerlo con un xpath', () => {
        cy.visit("/")
        cy.xpath('//select/option[@value="All"]').should("contain","All")
        cy.contains("All").should("be.visible")
     });
});