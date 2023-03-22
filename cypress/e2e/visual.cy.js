describe('Visual testing', () => {
    
    it('Mi primer prueba de regresion', () => {
        cy.visit("https://pokedexpokemon.netlify.app/");
        cy.wait(2000)
        cy.scrollTo("bottom")
        cy.matchImageSnapshot()
    });

    it.only('Segunda prueba a un solo elemento', () => {
        cy.visit("https://pokedexpokemon.netlify.app/");
        cy.contains("Bulbasaur").should("be.visible").matchImageSnapshot()
    });
});