const Login = require('../actions/login')
const Email = require('../actions/email')
const user = require('../fixtures/user.json')

describe('PWD renewal', () => {

    before('should visit raja home page', () => {
        cy.visit('/')
    })

    it('should input already existing id', () => {
        Login.goToLoginPage()
        Login.fillLogInForm(user)
        Login.checkPwdInputDisplay()
        Login.forgotPwdLaunch(user)
    })

    it('should get Email', () => {
        Email.getMostRecentResetPwdEmail(user)
        Email.getHtmlBody('@responseHtml')
    })

})