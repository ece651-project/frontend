/// <reference types="cypress" />

context('Index Integration Test', ()=>{
    beforeEach(() => {
        cy.visit('/index.html')
    })

    it('integration test', ()=>{
        cy.get('.nav-link').eq(1).click()
        cy.get('.modal-footer>.btn-primary').should('be.disabled')
        cy.get('input[name="signup_email"]').type('123')
        cy.get('.text-danger').eq(0).should('have.text', 'Invalid email address')
        cy.get('input[name="signup_email"]').clear().type('123@gmail.com')
        cy.get('.text-danger').eq(0).should('not.have.text')
        cy.get('input[name="signup_name"]').clear()
        cy.get('.text-danger').eq(1).should('have.text', 'Username is required')
        cy.get('input[name="signup_name"]').clear().type('321')
        cy.get('.text-danger').eq(1).should('not.have.text')
        cy.get('input[name="signup_pwd"]').type('abc')
        cy.get('.text-danger').eq(2).should('have.text', 'At lease 8 characters with 1 letter and 1 number')
        cy.get('input[name="signup_pwd"]').clear()
        cy.get('.text-danger').eq(2).should('have.text', 'Password is required')
        cy.get('input[name="signup_pwd"]').clear().type('123123aa')
        cy.get('.text-danger').eq(2).should('not.have.text')
        cy.get('.modal-footer>.btn-primary').click()
        cy.get('.text-danger').eq(0).should('have.text', 'Email already exist')

        cy.get('.btn-link').eq(1).click().wait(500)
        cy.get('.modal-footer>.btn-primary').click()
        cy.get('.text-danger').eq(0).should('have.text', 'Email is required')
        cy.get('.text-danger').eq(1).should('have.text', 'Password is required')
        cy.get('input[name="login_email"]').type('123')
        cy.get('.text-danger').eq(0).should('have.text', 'Invalid email address')
        cy.get('input[name="login_pwd"]').type('123123')
        cy.get('.text-danger').eq(1).should('not.have.text')
        cy.get('input[name="login_email"]').clear().type('123@gmail.com')
        cy.get('.modal-footer>.btn-primary').click()
        cy.get('.text-danger').eq(1).should('have.text', 'Password incorrect')
        cy.get('input[name="login_pwd"]').clear().type('123123aa')
        cy.get('.modal-footer>.btn-primary').click().wait(1000)
        cy.get('.nav-link').eq(0).should('have.text', 'Profile')

    })
})
