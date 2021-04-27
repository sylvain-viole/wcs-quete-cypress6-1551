function checkExistsAndVisible(locators, visibleMode = true) {
    locators.forEach(locator => {
        cy.get(locator).should('exist')
        if (visibleMode) {
            cy.get(locator).should('be.visible')
        }
    })
}

export { checkExistsAndVisible }