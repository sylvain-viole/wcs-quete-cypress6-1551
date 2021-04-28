const parser = new DOMParser();

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


function getHtmlBody() {
    cy.get("@responseHtml").its("body").as("stringHtml");
}

function parseHtml() {
    cy.get("@stringHtml").then(string => {
        const dom = parser.parseFromString(string, "text/html")
        cy.wrap(dom).as('dom')
    })
}

function getRestPwdLink() {
    cy.get('@dom').then(dom => {
        const link = dom.querySelector('[data-test-id="passwordResetLink"]').href;
        cy.wrap(link).as('link')
    });
}

function deleteEmailsFromUser(user) {
    cy.request(`https://mailo.xyz/api/emails/?inbox=${user.email}`)
        .its('body.data')
        .then(data => {
            data.forEach(mail => {
                cy.request('DELETE', `https://mailo.xyz/api/emails/${mail.id}`)
            })
        })
}

function checkUserHasNoEmail(user) {
    cy.request(`https://mailo.xyz/api/emails/?inbox=${user.email}`)
        .its("body.data")
        .then((data) => {
            expect(data).to.be.an('array').and.have.lengthOf(0)
        });
}



export {
    getMostRecentResetPwdEmail,
    getHtmlBody,
    parseHtml,
    getRestPwdLink,
    deleteEmailsFromUser,
    checkUserHasNoEmail
};