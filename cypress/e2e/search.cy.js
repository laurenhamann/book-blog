describe('home page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/')
    })
    context('search bar', () => {
      it('filter works by just typing string', () => {
        cy.getByData("search-input").type("Karin")
        cy.getByData("filter-header").contains("Filter: Karin")
      })
      it('filter works by just typing number', () => {
        cy.getByData("search-input").type("19")
        cy.getByData("filter-header").contains("Filter: 19")
      })
      it('page resets on button press & clears input', () => {
        cy.getByData("search-input").type("Hey")
        cy.getByData("filter-header").contains("Filter: Hey")
        cy.getByData("search-btn").click()
        cy.getByData("filter-header").should('be.exist')
        cy.getByData("search-input").should('have.value', '');
      })
    })
  })