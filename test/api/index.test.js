const chai = require('chai')
const chaiHttp = require('chai-http')
const sohuld = chai.should()
const server = require('../../app')

chai.use(chaiHttp)

describe('Node Server', () => {
    it('(GET /) anasayfayi dondurur', (done) =>{
        chai.request(server)
        .get('/')
        .end((err,res) =>{
            res.should.have.status(200)
            done()
        })
    })
})