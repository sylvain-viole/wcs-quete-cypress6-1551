function getMostRecentResetPwdEmail(user) {
    let mailId
    const url = `https://${user.email}/api/emails?sender=jpg@raja.fr`;
    cy.request('GET', url).then((res) => {
        mailId = res.body.data[0].id
    }).then(() => {
        cy.request({
            method:'GET',
            url:`https://${user.email}/api/emails/${mailId}`, 
            headers: {'Accept':'text/html'}
        }).then(res => {
            expect(res.status).to.be.ok
            expect(res.headers).to.have.property("content-type").that.contains('text/html');
            cy.wrap(res).as('responseHtml')
        })
    })
}

function getHtmlBody(mail) {
    cy.get(mail).its('body')
}

export { getMostRecentResetPwdEmail, getHtmlBody };