const Api = require('../actions/api')
const login = require('../locators/login.json')

function resetPwd(user) {
    const target = login.resetPwd;
    cy.isThere(target);
    cy.setInput(target.newPwd, user.newPwd);
    cy.setInput(target.newPwdRetype, user.newPwd);
    cy.get("button[type=submit]").eq(1).click();
    Api.checkResponse(
        "/INTERSHOP/web/WFS/RAJA-JPG-Site/fr_FR/-/EUR/ViewForgotLoginData-UpdatePassword"
    );
    cy.get('h4.typo-title').contains('Félicitations').should('be.visible')
    cy.get("p.typo-subtitle")
        .contains("Votre mot de passe a été réinitialisé")
        .should("be.visible");

}

export {resetPwd}