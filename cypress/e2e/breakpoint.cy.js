describe('home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000/')
        cy.viewport(1023, 800)
    })
    context('Desktop View', () => {
        it('will show aside filters', () => {
            cy.get('aside').should('exist')
        })
    })
})