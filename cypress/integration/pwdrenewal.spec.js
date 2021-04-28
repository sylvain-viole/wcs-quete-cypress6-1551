const Login = require("../actions/login");
const Connection = require("../actions/connection");
const Signup = require("../actions/signup");
const Email = require("../actions/email");
const RestPwd = require("../actions/resetPwd");
const { User } = require("../fixtures/User");

const user = new User("testUser")

describe("PWD renewal", () => {
    before("should visit raja home page", () => {
        cy.visit("/");
    });

    it("should go to log in page", () => {
        Login.goToLoginPage();
        Login.fillLogInForm(user);
        cy.wait(1000);
    });

    it("should input already existing id", () => {
        Login.checkPwdInputDisplay();
        Login.forgotPwdLaunch(user);
    });

    it("should get Email and visit reset pwd link", () => {
        Email.getMostRecentResetPwdEmail(user);
        Email.getHtmlBody();
        Email.parseHtml();
        Email.getRestPwdLink();
        cy.get("@link").then((link) => {
            cy.visit(link);
        });
    });

    it("should reset pwd", () => {
        RestPwd.resetPwd(user);
    });

    after("delete emails", () => {
        Email.deleteEmailsFromUser(user)
        Email.checkUserHasNoEmail(user)
    })
});
