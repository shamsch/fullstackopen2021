describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
          name: 'Remon',
          username: 'remon',
          password: '123456'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user) 
        cy.visit('http://localhost:3000')
      })
    
      it('Login form is shown', function() {
        cy.contains('login to the application')
      })

      describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#username').type('remon')
          cy.get('#password').type('123456')
          cy.get('#login-button').click()
          cy.contains('remon logged in')
        })
    
        it('fails with wrong credentials and error in red', function() {
          cy.get('#username').type('notremon')
          cy.get('#password').type('123456')
          cy.get('#login-button').click()
          cy.contains('Login credential invalid')

          //error color check 
          cy.get('#notification').should('have.css', 'background-color', 'rgb(255, 0, 0)')
        })
      })
  })