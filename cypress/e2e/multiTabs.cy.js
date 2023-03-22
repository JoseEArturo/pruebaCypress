describe('Navegando entre diferentes tabs', () => {
    it('Visitar links que tengan el target _blank', () => {
        cy.visit("https://demoqa.com/links")
        cy.get("#simpleLink").click()
    });

    it.only('Abrir la pagina dentro de la misma ventana', () => {
        cy.visit("https://demoqa.com/links")
        cy.get("#simpleLink").invoke("removeAttr","target").click()
    });
    
});