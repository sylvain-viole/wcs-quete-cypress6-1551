function checkResponse(url) {
    cy.intercept(url, (req) => {
        req.continue((res) => {
            expect(res).to.be.ok;
            expect(res.body).to.have.property("success", "true");
        });
    });
}

export { checkResponse };
