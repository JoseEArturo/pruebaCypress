describe('Flaky test', () => {
    
    it('Single query comand', () => {
        cy.visit("/")
        cy.contains("All").should("be.visible")
    });

    it.only('Alternar comandos con aserciones', () => {
        cy.visit("/")
       // cy.get('#search').click()
        //Asercion para reintentar hasta que se cumpla una condición
        cy.get('#search').should("not.to.be.disabled").click

        cy.xpath('//select/option[@value="All"]').should("contain","All").
        parent().should("have.id","filter")
    });
});