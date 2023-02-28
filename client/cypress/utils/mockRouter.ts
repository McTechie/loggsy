import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export const mockRouter: AppRouterInstance = {
  push: (path: string) => {
    cy.stub()
  },
  back: () => {
    cy.stub()
  },
  forward: () => {
    cy.stub()
  },
  replace: (path: string) => {
    cy.stub()
  },
  refresh: () => {
    cy.stub()
  },
  prefetch: (path: string) => {
    cy.stub()
  }
}
