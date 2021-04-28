const signup = require("../locators/signup.json");

function signUpNewUser(user) {
    createAccountClick();
    cy.wait(1000);
    fillIdentifiers(user);
    cy.wait(1000);
    fillStatus(user);
    cy.wait(1000);
    fillPlace(user);
    cy.wait(1000);
    fillInformations(user);
    cy.wait(1000);
    fillCgu();
    cy.wait(1000);
    terminateSignUp();
}

function createAccountClick() {
    cy.isThere(signup.createAccount);
    cy.get(signup.createAccount).scrollIntoView().click({ force: true });
}

function fillIdentifiers(user) {
    const target = signup.identifier;
    cy.isThere(target);
    cy.setInput(target.emailRetype, user.email);
    cy.setInput(target.pwd, user.pwd);
    cy.get(target.nextBtn).click();
}

function fillStatus(user) {
    const target = signup.status;
    cy.isThere(target);
    if (user.status === "particular") {
        cy.get(target.particular).check({ force: true });
    }
    if (user.status === "company") {
        cy.get(target.company).check();
    }
    cy.get(target.nextBtn).click();
}

function fillPlace(user) {
    const target = signup.place;
    cy.isThere(target);
    cy.setInput(target.address, user.address, true);
    cy.setInput(target.zip, user.zip);
    cy.setInput(target.city, user.city);
    cy.get(target.nextBtn).click();
}

function fillInformations(user) {
    const target = signup.informations;
    cy.isThere(target);
    if (user.gender === "M") {
        cy.get(target.genderM).check({ force: true });
    }
    if (user.gender === "F") {
        cy.get(target.genderF).check({ force: true });
    }
    cy.setInput(target.fn, user.fn);
    cy.setInput(target.ln, user.ln);
    cy.setInput(target.mobile, user.mobile);
    cy.get(target.nextBtn).click();
}

function fillCgu() {
    const target = signup.newsletter;
    cy.isThere(target);
    cy.get(target.cgu).check({ force: true });
    cy.get(target.nextBtn).click();
}

function terminateSignUp() {
    cy.wait(1000)
    cy.get("section#10").find('button.next-section').contains("Terminer").should('exist').click({ force: true });
}

export { signUpNewUser };
