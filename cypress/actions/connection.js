const header = require('../locators/header.json')

function checkIfConnected() {
    cy.isThere(header.login.btnIsConnected);
}

function checkLoggedUserName(user) {
    cy.isThere(header.login.btnIsConnected);
        cy.get(header.login.btnIsConnected).click({force: true});
        cy.get("span")
            .contains(`${user.fn} ${user.ln}`)
            .should("exist")
            .and("be.visible");
}

function logout() {
    cy.visit(
        "/INTERSHOP/web/WFS/RAJA-JPG-Site/fr_FR/-/EUR/ViewUserAccount-LogoutUser"
    );
}


export { checkIfConnected, checkLoggedUserName, logout };