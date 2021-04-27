function goToLoginPage() {
    cy.checkExistsAndVisible(["#dropdown-account"]);
    cy.get("#dropdown-account")
        .click()
        .then(() => {
            cy.checkExistsAndVisible(["button#open-connect-btn"]);
            cy.get("button#open-connect-btn").click();
        });
}

function fillLogInForm(user) {
    cy.checkExistsAndVisible(["#UserLogin", "#next-pwd"], false);
    cy.setInput("#UserLogin", user.email);
    cy.get("#next-pwd").click();
}

function checkPwdInputDisplay() {
    cy.checkExistsAndVisible(["#UserPassword", "#link-new-pwd"]);
}

function forgotPwdLaunch(user) {
    cy.intercept(
        "POST",
        "INTERSHOP/web/WFS/RAJA-JPG-Site/fr_FR/-/EUR/ViewForgotLoginData-SendPassword",
        (req) => {
            expect(req.body).to.include("svioletest%40mailo.xyz");
        }
    );
    cy.get("#link-new-pwd").click();
    cy.checkExistsAndVisible(["#NewPwdLogin", "#sendpwdbutton"]);
    cy.get("#NewPwdLogin").should("have.value", user.email);
    cy.get("#sendpwdbutton").click();
}

export { goToLoginPage, fillLogInForm, checkPwdInputDisplay, forgotPwdLaunch };
