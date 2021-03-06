/// <reference types="cypress" />

context('Index Integration Test', ()=>{
    beforeEach(() => {
        cy.visit('/index.html')
    })

    it('integration test', ()=>{
        expect(1).to.equal(1)
    })
})
