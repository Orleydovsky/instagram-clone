/// <reference types="cypress" />

describe('Unauthenticated user flow', () => {
  it('allows interaction with login and sign up pages', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.get('form').within(() => {
      cy.get('button').contains('Login').should('be.disabled')
      cy.get('input[name="email"]').type('leonardo@email.com')
      cy.get('button').contains('Login').should('be.disabled')
      cy.get('input[name="password"]').type('123456')
      cy.get('button').contains('Login').should('not.be.disabled')
    })
    cy.get('a').contains('Sign up').click()
    cy.get('.animate-pulse').should('not.exist')
    cy.location('pathname').should('eq', '/signup')
    cy.get('form').within(() => {
      cy.get('button').contains('Sign up').should('be.disabled')
      cy.get('input[name="email"]').type('leonardo@email.com')
      cy.get('button').contains('Sign up').should('be.disabled')
      cy.get('input[name="name"]').type('Leonardo da Vinci')
      cy.get('button').contains('Sign up').should('be.disabled')
      cy.get('input[name="username"]').type('leonardo')
      cy.get('button').contains('Sign up').should('be.disabled')
      cy.get('input[name="password"]').type('123456')
      cy.get('button').contains('Sign up').should('not.be.disabled')
    })
    cy.get('a').contains('Log in').click()
    cy.location('pathname').should('eq', '/')
  })
})
