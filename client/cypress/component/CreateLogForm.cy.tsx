import { CreateLogForm } from '../../src/components'
import { mockRouter } from '../utils/mockRouter'

// NOTE: We are using the intercept command to prevent hitting the actual Backend API
// by doing this, our tests will remain isolated and would not depend on the working of the Backend APIs

describe('Log Creation Functionality', () => {
  it('creates a TRACE log', () => {
    cy.intercept(
      {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/log`,
      },
      {
        statusCode: 201,
        body: {
          id: '1',
          source: 'Test Service',
          severity: 'TRACE',
          timestamp: '2023-02-28T12:00:00',
          message: 'This is a test message',
        },
      }
    ).as('createTraceLog')

    cy.mount(
      <CreateLogForm router={mockRouter} />
    )

    cy.get('input[id="source"]').type('Test Service')
    cy.get('select[id="severity"]').select('TRACE')
    cy.get('input[id="timestamp"]').type('2023-02-28T12:00:00')
    cy.get('textarea[id="message"]').type('This is a test message')

    cy.get('button[type="submit"]').click()
  })

  it('creates a DEBUG log', () => {
    cy.intercept(
      {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/log`,
      },
      {
        statusCode: 201,
        body: {
          id: '2',
          source: 'Test Service',
          severity: 'DEBUG',
          timestamp: '2023-02-28T12:00:00',
          message: 'This is a test message',
        },
      }
    ).as('createDebugLog')

    cy.mount(
      <CreateLogForm router={mockRouter} />
    )

    cy.get('input[id="source"]').type('Test Service')
    cy.get('select[id="severity"]').select('DEBUG')
    cy.get('input[id="timestamp"]').type('2023-02-28T12:00:00')
    cy.get('textarea[id="message"]').type('This is a test message')

    cy.get('button[type="submit"]').click()
  })

  it('creates a INFO log', () => {
    cy.intercept(
      {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/log`,
      },
      {
        statusCode: 201,
        body: {
          id: '3',
          source: 'Test Service',
          severity: 'INFO',
          timestamp: '2023-02-28T12:00:00',
          message: 'This is a test message',
        },
      }
    ).as('createInfoLog')

    cy.mount(
      <CreateLogForm router={mockRouter} />
    )

    cy.get('input[id="source"]').type('Test Service')
    cy.get('select[id="severity"]').select('INFO')
    cy.get('input[id="timestamp"]').type('2023-02-28T12:00:00')
    cy.get('textarea[id="message"]').type('This is a test message')

    cy.get('button[type="submit"]').click()
  })

  it('creates a WARN log', () => {
    cy.intercept(
      {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/log`,
      },
      {
        statusCode: 201,
        body: {
          id: '4',
          source: 'Test Service',
          severity: 'WARN',
          timestamp: '2023-02-28T12:00:00',
          message: 'This is a test message',
        },
      }
    ).as('createWarnLog')

    cy.mount(
      <CreateLogForm router={mockRouter} />
    )

    cy.get('input[id="source"]').type('Test Service')
    cy.get('select[id="severity"]').select('WARN')
    cy.get('input[id="timestamp"]').type('2023-02-28T12:00:00')
    cy.get('textarea[id="message"]').type('This is a test message')

    cy.get('button[type="submit"]').click()
  })

  it('creates an ERROR log', () => {
    cy.intercept(
      {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/log`,
      },
      {
        statusCode: 201,
        body: {
          id: '5',
          source: 'Test Service',
          severity: 'ERROR',
          timestamp: '2023-02-28T12:00:00',
          message: 'This is a test message',
        },
      }
    ).as('createErrorLog')

    cy.mount(
      <CreateLogForm router={mockRouter} />
    )

    cy.get('input[id="source"]').type('Test Service')
    cy.get('select[id="severity"]').select('ERROR')
    cy.get('input[id="timestamp"]').type('2023-02-28T12:00:00')
    cy.get('textarea[id="message"]').type('This is a test message')

    cy.get('button[type="submit"]').click()
  })

  it('creates a FATAL log', () => {
    cy.intercept(
      {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/log`,
      },
      {
        statusCode: 201,
        body: {
          id: '6',
          source: 'Test Service',
          severity: 'FATAL',
          timestamp: '2023-02-28T12:00:00',
          message: 'This is a test message',
        },
      }
    ).as('createFatalLog')

    cy.mount(
      <CreateLogForm router={mockRouter} />
    )

    cy.get('input[id="source"]').type('Test Service')
    cy.get('select[id="severity"]').select('FATAL')
    cy.get('input[id="timestamp"]').type('2023-02-28T12:00:00')
    cy.get('textarea[id="message"]').type('This is a test message')

    cy.get('button[type="submit"]').click()
  })
})
