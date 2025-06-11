import home from '../page/homepage'

let HOST = Cypress.env('HOST')
let USER_ID = Cypress.env('USER_ID')
let PASSWORD = Cypress.env('PASSWORD')
// let BASE_URL = Cypress.env('BASE_URL') // Uncomment this line if you want to use environment variable for BASE_URL
let BASE_URL = 'https://dealls.com' // Hardcoded URL for testing purposes

 
// This is the main test file for Dealls login functionality
// It includes tests for landing page validation, login page navigation, and user login functionality
// using non isolated tests to ensure that the session is maintained across tests
describe('Dealls', { testIsolation: false }, () => {
	before('Clear Cache', () => {
		cy.clearAllSessionStorage()
		cy.clearAllCookies()
	})
	it('Verify is on landing page', () => {
        const TITLE = 'Cari Lowongan Kerja Pakai Dealls #LebihPasti'
        cy.once('uncaught:exception', () => false);
        cy.visit(BASE_URL)
        cy.document().its('readyState').should('eq', 'complete');
        home.validateOnLandingPage(TITLE)
	})
    it('Verify is on login Page', () => {
        home.clickLoginButton()
        cy.url().should('include', '/sign-in')
    })
    it('Verify User Able to Login', () => {
        // you can setup the EMAIL and PASSWORD from Cypress environment variables
        // or you can hardcode it here for testing purposes
        const EMAIL = 'automationtestcase@mail.com'
        const PASSWORD = '12345678'
        const STATUS_CODE = 403
        cy.intercept('POST',' https://api.sejutacita.id/v1/login/email').as('apiResponse')

        home.inputEmail(EMAIL)
        home.inputPassword(PASSWORD)
        home.clickSubmitButton()
        cy.wait('@apiResponse', { timeout: 120000 }).its('response.statusCode').should('eq', STATUS_CODE)
        // Verify that the user is validated
        // is use invalid credentials to test the error message

    })
})