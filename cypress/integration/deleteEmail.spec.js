const Email = require('../actions/email')
const { User } = require ('../fixtures/User')

const user = new User("testUser");

describe('delete emails', () => {
    it('should delete email', () => {
        Email.deleteEmailsFromUser(user)
    })
})