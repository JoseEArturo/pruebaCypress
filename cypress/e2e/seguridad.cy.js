let texto
describe('Seguridad', () => {

    it('Navegar entre diferentes dominios', () => {
        cy.visit("https://pokedexpokemon.netlify.app/");
        cy.visit("https://todo-cypress-iota.vercel.app/");
        cy.get("#title").type("Titulo de prueba")
    });

    it('Navegar a un dominio', function() {
        cy.visit("https://todo-cypress-iota.vercel.app/");
        cy.get("h1").invoke("text").as("titulo")
    });

    it('Navegar a otro dominio', function() {
        cy.visit("/");
        cy.log(this.titulo);
        //cy.get("h1").invoke("text").as("titulo")
    });

    it('Navegar en dos dominios en el mismo test', function() {
        cy.visit("https://pokedexpokemon.netlify.app/")
        cy.get("h1").first().invoke("text").then( text => {

            Cypress.env({
                textito:text
            })
        })
        cy.origin("https://todo-cypress-iota.vercel.app/", {args:{texto: "hola"}}, 
        function ({texto}) {
            cy.visit("https://pokedexpokemon.netlify.app/")
            cy.log(texto)
            cy.log(Cypress.env())
        })
        cy.visit("https://pokedexpokemon.netlify.app/")
        cy.get("h1").first().invoke("text").should("be.equal", Cypress.env("textito"))
    });

    it.only('Compartir informacion sin usar sesion', function () { 
        cy.visit("https://pokedexpokemon.netlify.app/")
        cy.get('h1').first().invoke('text')
        .then(text=>{
            cy.task('guardar', { texto: text })
        })
    });

    it.only('Compartir informacion sin usar sesion 2', function () { 
        cy.visit("https://todo-cypress-iota.vercel.app/");
        cy.task('obtener','texto').then(valor=>{
            cy.get('#title').type(valor)
        })
    });
    
});