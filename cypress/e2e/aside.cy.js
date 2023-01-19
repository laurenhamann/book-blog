describe('aside', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000/')
        cy.viewport(1023, 800)
    })
    context('Aside', () => {
        it('Initial selected = Authors', () => {
            cy.get("aside")
        })
    })
})