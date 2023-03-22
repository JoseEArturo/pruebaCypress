describe('LocalStorage', () => {

    beforeEach(() => {
        // cy.visit("https://todo-cypress-iota.vercel.app")
        // cy.get("#title").type("Titulo de prueba")
        // cy.get("#description").type("Descripcion de prueba")
        // cy.contains("Create").click()

        cy.session("sesion todo", ()=>{
            cy.visit("https://todo-cypress-iota.vercel.app").then(()=>{
                localStorage.setItem("react_todo_ids",JSON.stringify(["Titulo de prueba"]))
                localStorage.setItem("Titulo de prueba",JSON.stringify({
                    title:"Titulo de prueba",
                    id:"Titulo de prueba",
                    complete: false,
                    description:"Descripcion de la prueba"
                }))
             })
        }) 

         cy.visit("https://todo-cypress-iota.vercel.app")
    });

    it('Crear una tarea', () => {

        // cy.visit("https://todo-cypress-iota.vercel.app")
        // cy.get("#title").type("Titulo de prueba")
        // cy.get("#description").type("Descripcion de prueba")
        // cy.contains("Create").click()
        

        cy.contains("Titulo de prueba")
        cy.reload()
        cy.contains("Titulo de prueba").then(()=>{
            expect(localStorage.getItem("Titulo de prueba")).to.exist
        })

        cy.contains("Remove").click().then(()=>{
            expect(localStorage.getItem("Titulo de prueba")).to.not.exist
        })

        // cy.clearLocalStorage("Titulo de prueba").should(ls=>{
        //     expect(ls.getItem("prop1")).to.be.null
        // })
    });

    it('Valido que la tarea se creo correctamente', () => {
      //  cy.visit("https://todo-cypress-iota.vercel.app")
        cy.expect(localStorage.getItem("Titulo de prueba")).to.exist
    });
});