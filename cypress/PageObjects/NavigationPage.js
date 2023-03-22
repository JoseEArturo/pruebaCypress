export class NavigationPage {

    constructor(){
        this.accountActivity = "#account_activity_tab > a";
        this.showTransactions = ".board-header";
    }

    clickAccountActivity(){
        cy.get(this.accountActivity).click()
    }

    clickShowTransactions(){
        cy.get(this.showTransactions).click()
    }
}

export const navigationPage = new NavigationPage()