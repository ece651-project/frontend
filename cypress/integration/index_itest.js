/// <reference types="cypress" />

context('Integration Test', ()=>{
    beforeEach(() => {
        cy.visit('/index.html')
    })

    it('integration test', ()=>{
        cy.get('.nav-link').eq(0).click()
        cy.get('input[name="login_email"]').type('123@gmail.com')
        cy.get('input[name="login_pwd"]').type('123123aa')
        cy.get('.modal-footer>.btn-primary').click().wait(1000)
        cy.get('.nav-link').eq(0).should('have.text', 'Profile')
        cy.get('.nav-link').eq(0).click().wait(2000)
        cy.get('li[heading="For Rent"]').click()
        cy.get('button[ng-click="apt_add_new()"]').click()
        cy.get('input[name="addr1"]').type('213 Street')
        cy.get('input[name="city"]').type('Waterloo')
        cy.get('select[name="province"]').select('ON')
        cy.get('input[name="zip"]').type('X1C 2B3')
        cy.get('select[name="type"]').select('House')
        cy.get('input[name="term"]').type('12')
        cy.get('input[name="vacancy"]').type('2')
        cy.get('input[name="price"]').type('600')
        cy.get('textarea[id="description"]').type('audfybgoqyhwoe')
        cy.get('button[ng-click="apt_submit()"]').click().wait(2000)

        cy.get('.navbar-brand').click().wait(1000)
        cy.get('button[ng-click="to_aptlist()"]').click().wait(2000)
        cy.get('.list-link').last().click().wait(2000)

        cy.get('.card').eq(1).find('.card-body').eq(1).find('.float-right').should('have.text', '12')
        cy.get('.card').eq(1).find('.card-body').eq(2).find('.float-right').should('have.text', 'House')
        cy.get('.card').eq(1).find('.card-body').eq(3).find('.float-right').should('have.text', '2')
        cy.get('.card').eq(1).find('.card-body').eq(4).find('.float-right').should('have.text', '600 CAD$/month')

    })
})
