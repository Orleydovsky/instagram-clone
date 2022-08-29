/// <reference types="cypress" />

import { findByRole } from '@testing-library/dom'

describe('User login and log out flow', () => {
  it('allows an existent user to log in', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.get('form').within(() => {
      cy.get('input[name="email"]').type('leonardo@email.com')
      cy.get('input[name="password"]').type('123456')
      cy.get('button').contains('Login')
        .click()
        .contains('Loading...')
    })
    cy.get('nav').within(() => {
      cy.get('.rounded-full').click()
    })
    cy.get('reach-portal').within(() => {
    })
  })
})
