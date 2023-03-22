const dispositivos = [
    { viewport: "macbook-15", type: "desktop" },
    { viewport: "ipad-2", type: "mobile" },
    { viewport: [1280, 720], type: "desktop" },
    { viewport: [375, 667], type: "mobile" }
];

describe('Dispositivos moviles', () => {

    // it('Usando el viewport', () => {
    //     cy.viewport(1280,720)
    //     cy.visit("/")
    //     cy.get(".my-4").should("to.be.visible")
    //   //  cy.contains("Safari").should("to.be.visible")
    // });

    // it('Usando el viewport moviles', () => {
    //     cy.viewport(375,667)
    //     cy.visit("/")
    //     cy.get(".my-4").should("to.be.visible")
    // });

    
    // it('Usando el viewport desktop preset', () => {
    //     cy.viewport("macbook-15")
    //     cy.visit("/")
    //     cy.get(".my-4").should("to.be.visible")
    // });

    // it('Usando el viewport mobile preset', () => {
    //     cy.viewport("iphone-6+")
    //     cy.visit("/")
    //     cy.get(".my-4").should("to.be.visible")
    // });

    dispositivos.forEach(device=>{
        it(`Pruebas con el viewport ${device.viewport}`, () => {

            if (Cypress._.isArray(device.viewport)) {
                cy.viewport(device.viewport[0], device.viewport[1])
            }
            else{
                cy.viewport(device.viewport)
            }
            cy.visit("/")

            if (device.type==="desktop") {
                cy.get(".my-4").should("to.be.visible")
            }
            else {
                cy.get(".my-4").should("to.be.visible") 
            }
        });
    })
});