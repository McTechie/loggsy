export const getLocalStorage = (key: string) => {
  return cy.window().then((win) => {
    return win.localStorage.getItem(key)
  })
}
