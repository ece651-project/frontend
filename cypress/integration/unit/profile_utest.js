/// <reference types="cypress" />

context('Profile Unit Test', ()=>{
    beforeEach(() => {
        cy.visit('/page/profile.html')
        cy.get('.nav-link').eq(0).click()
        cy.get('input[name="login_email"]').type('123@gmail.com')
        cy.get('input[name="login_pwd"]').type('123123aa')
        cy.get('.modal-footer>.btn-primary').click().wait(2000)
        cy.get('.nav-link').eq(0).should('have.text', 'Profile')
    })

    it('add apt test', ()=>{
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

        cy.get('table').find('tr').last().find('td').eq(1).find('.mb-1').eq(0).should('have.text', '213 Street,Waterloo,ON')
        cy.get('table').find('tr').last().find('td').eq(1).find('.mb-1').eq(1).should('have.text', 'House')
        cy.get('table').find('tr').last().find('td').eq(1).find('.mb-1').eq(3).should('have.text', '600')
    })
    it('update apt test', ()=>{
        cy.get('table').find('tr').last().find('td').eq(2).find('.btn-primary').eq(0).click().wait(2000)
        cy.get('input[name="addr2"]').clear().type('U0')
        cy.get('select[name="type"]').select('Studio')
        cy.get('input[name="price"]').clear().type('800')
        cy.get('button[ng-click="apt_submit()"]').click().wait(2000)

        cy.get('table').find('tr').last().find('td').eq(1).find('.mb-1').eq(0).should('have.text', '213 Street,U0,Waterloo,ON')
        cy.get('table').find('tr').last().find('td').eq(1).find('.mb-1').eq(1).should('have.text', 'Studio')
        cy.get('table').find('tr').last().find('td').eq(1).find('.mb-1').eq(3).should('have.text', '800')

        cy.get('table').find('tr').last().find('td').eq(2).find('.btn-primary').eq(1).click().wait(2000)
    })
    it('update user test', ()=>{
        cy.get('li[heading="Edit Profile"]').click()
        cy.get('input[name="edit_phone"]').clear().type('147258369')
        cy.get('button[ng-click="edit_update()"]').click().wait(2000)
        cy.get('.fa-phone-square').should('have.text', ' 147258369')
    })
})