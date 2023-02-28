import { getLocalStorage } from '../utils/getLocalStorage'

describe('Dark Mode Functionality', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('loggsyDarkMode', 'false')
      }
    })
  })

  it('toggles dark mode', () => {
    cy.get('[data-cy="dark-mode-toggle"]').click()

    getLocalStorage('loggsyDarkMode').should('eq', 'true')
  })

  it('toggles dark mode twice', () => {
    cy.get('[data-cy="dark-mode-toggle"]').click()
    cy.get('[data-cy="dark-mode-toggle"]').click()

    getLocalStorage('loggsyDarkMode').should('eq', 'false')
  })

  it('persists dark mode on page reload', () => {
    cy.get('[data-cy="dark-mode-toggle"]').click()

    cy.reload()

    getLocalStorage('loggsyDarkMode').should('eq', 'true')
  })

  it('persists dark mode on page navigation', () => {
    cy.get('[data-cy="dark-mode-toggle"]').click()

    cy.visit('/create')

    getLocalStorage('loggsyDarkMode').should('eq', 'true')
  })
})