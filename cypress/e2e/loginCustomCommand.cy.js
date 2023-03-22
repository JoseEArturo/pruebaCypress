describe('Login con custom command', () => {

    it('Login erroneo', () => {
        cy.login('asasa','asdadasd')
    });

    it('Login correcto', () => {
        cy.login('username','password')
    });
    
});