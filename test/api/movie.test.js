const chai = require('chai')
const chaiHttp = require('chai-http')
const sohuld = chai.should()
const server = require('../../app')

chai.use(chaiHttp)

let token;

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
        .post('/authenticate')
        .send({username: 'test',password: '12345'})
        .end((err,res)=>{
            token = res.body.token
            done()
        })
    }) // test baslamadan once islem yamamizi saglar 

    describe('/GET movies', () => {
        it('it should GET all the movies', (done) =>{
            chai.request(server)
            .get('/api/movies')
            .set('x-access-token',token)
            .end((err,res) =>{
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
            
        })
    })

    describe('/POST movie',()=>{
        it('it should post a movie', (done)=>{
            const movie = {
                title: "Udemy",
                director_id: '5bbe597062041109ac2ceefa',
                category: 'Komedi',
                country: 'Turkey',
                year: '1950',
                imdb_score: 8
            }
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('title')
                res.body.should.have.property('director_id')
                res.body.should.have.property('category')
                res.body.should.have.property('country')
                res.body.should.have.property('year')
                res.body.should.have.property('imdb_score')

                done()

            })
        })
    })
})