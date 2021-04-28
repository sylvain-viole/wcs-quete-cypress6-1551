const faker = require('faker')

export class User{
    constructor(ln) {
        this.fn = faker.name.firstName()
        this.ln = ln
        this.email = `${this.ln}@mailo.xyz`
        this.pwd = "1234A@DRFtG7§DE'!"
        this.newPwd = "ACEDEF4@#:Tfeuhsxbj"
        this.gender = "M"
        this.mobile = "0123456789"
        this.status = "particular"
        this.address = faker.address.streetAddress()
        this.zip = "75000"
        this.city = "PARIS"
    }
}
