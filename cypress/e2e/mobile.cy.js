describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
    cy.viewport(425, 600)
  })
  context('mobile view', () => {
    it('will NOT show aside filters', () => {
      cy.get('aside').should('be.hidden')
    })
  })
})