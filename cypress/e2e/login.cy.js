import { loginPage } from "../PageObjects/LoginPage";

describe("Login con POM", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("Login erroneo", () => {
    loginPage.validateLoginPage();
    loginPage.login("lalala", "lalala");
    loginPage.validateErrorLogin();
  });

  it("Login exitoso con cy.env", () => {
    loginPage.validateLoginPage();
    loginPage.login(
      Cypress.env("credentials").user,
      Cypress.env("credentials").password
    );
    loginPage.validateSuccessLogin();
  });

  it("Login exitoso con cy.env.json", () => {
    loginPage.validateLoginPage();
    cy.log(Cypress.env());
    loginPage.login(
      Cypress.env("credentials").user,
      Cypress.env("credentials").password
    );
    loginPage.validateSuccessLogin();
  });

  it("Login erroneo desde la terminal", () => {
    loginPage.validateLoginPage();
    cy.log(Cypress.env());
    loginPage.login(
      Cypress.env("credentials").user,
      Cypress.env("credentials").password
    );
    loginPage.validateSuccessLogin();
  });
});

describe(
  "Login erroneo con configuracion",
  {
    env: {
      usuarioErroneo: "error1",
      passwordErroneo: "error2",
    },
  },
  () => {
    beforeEach(() => {
      loginPage.visit();
    });

    it("Login erroneo", () => {
      loginPage.validateLoginPage();
      cy.log(Cypress.env());
      loginPage.login(
        Cypress.env("usuarioErroneo"),
        Cypress.env("passwordErroneo")
      )
      loginPage.validateErrorLogin()
    });
  }
);

describe('Login con fixtures', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('Login erroneo', () => {

    loginPage.validateLoginPage()

    cy.fixture('credentials').then(credentials=>{
      loginPage.login(credentials.email, credentials.password)
    })

    loginPage.validateErrorLogin()
  });

  it('Login exitoso', () => {

    loginPage.validateLoginPage()

    cy.fixture('usuarios').then(usuarios=>{
      loginPage.login(usuarios.email, usuarios.password)
    })
    
    loginPage.validateErrorLogin()
  });

});

const credentialsForUsers = [
  {
    nombre: "credentials",
    titulo: "login con credenciales"
  },
  {
    nombre: "usuarios",
    titulo: "login con usuarios"
  }
]

credentialsForUsers.forEach(credentials=>{
  describe.only(credentials.titulo, () => {
    
    beforeEach(() => {
      loginPage.visit();
    });

    it('Login erroneo con fixtures', () => {
      loginPage.validateLoginPage()
      cy.fixture(credentials.nombre).then(credentials=>{
        loginPage.login(credentials.email,credentials.password)
      })
      loginPage.validateErrorLogin()
    });
    
  });
});
