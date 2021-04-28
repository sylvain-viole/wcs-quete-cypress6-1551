const Api = require("../actions/api");
const header = require("../locators/header.json");
const identify = require("../locators/identify.json");
const login = require("../locators/login.json");

function goToLoginPage() {
    cy.isThere(header.login.dropdownAccount);
    cy.get(header.login.dropdownAccount)
        .click()
        .then(() => {
            cy.isThere(header.login.btnOpenConnect);
            cy.get(header.login.btnOpenConnect).click();
        });
}

function fillLogInForm(user) {
    cy.isThere(identify, false);
    cy.setInput(identify.userLogin, user.email);
    cy.get(identify.nextPwd).click();
}

function checkPwdInputDisplay() {
    cy.isThere([login.userPwd, login.linkNewPwd]);
}

function forgotPwdLaunch(user) {
    cy.intercept(
        "POST",
        "INTERSHOP/web/WFS/RAJA-JPG-Site/fr_FR/-/EUR/ViewForgotLoginData-SendPassword",
        (req) => {
            expect(req.body).to.include(encodeURIComponent(user.email));
        }
    );
    cy.get(login.linkNewPwd).click();
    const target = login.launchResetPwd
    cy.isThere(target);
    cy.get(target.pwdLogin).should("have.value", user.email);
    cy.get(target.sendPwd).click();
}

export { goToLoginPage, fillLogInForm, checkPwdInputDisplay, forgotPwdLaunch };
