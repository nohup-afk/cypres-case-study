import {commonPage}  from '../page/locator'
class onLandingPage {
    visit() {
        cy.visit('/')
    }
    
    validateOnLandingPage(text) {
        cy.once('uncaught:exception', () => false);
        cy.get(commonPage.title).should('be.visible').then((title) => {
            const titleText = title.text();
            cy.log('Page title text:', titleText);
            expect(titleText).to.include(text);
        });
    }
    clickLoginButton() {
        cy.get(commonPage.btn_login).should('be.visible').click()
    }
    inputEmail(email) {
        cy.get(commonPage.field_email).should('be.visible').click()
		cy.get(commonPage.field_email).should('be.visible').clear().type(email)
		cy.get(commonPage.field_email).should('have.value', email) // Verify the input value
    }
    inputPassword(password) {
        cy.get(commonPage.field_password).should('be.visible').click()
        cy.get(commonPage.field_password).should('be.visible').clear().type(password)
        cy.get(commonPage.field_password).should('have.value', password) // Verify the input value
    }  
    clickSubmitButton() {
        cy.get(commonPage.btn_sign_in).should('be.visible').contains('Sign In').click()
    } 
}
export default new onLandingPage()
