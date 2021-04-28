const Login = require("../actions/login");
const Signup = require("../actions/signup");
const Connection = require("../actions/connection");
const faker = require('faker')
const { User } = require("../fixtures/User");

const user = new User("testUser");

describe("Creates an account", () => {
    
    before("should visit raja home page", () => {
        cy.visit("/");
    });
    it("should go to log in page", () => {
        Login.goToLoginPage();
        Login.fillLogInForm(user);
        cy.wait(1000)
    });

    it("should create an account", () => {
        Signup.signUpNewUser(user);
    });

    it("should be connected", () => {
        Connection.checkIfConnected(user);
    });
});

export { user };
