import request from "supertest";
import app from "../../app";
import { describe } from "node:test";

describe("POST /reservations", () => {

    describe("give a reservation", () => {
        
        test("should respond with a 200 status code", async () => {
            const createResponse = await request(app).post("/reservations").send({
                homeType: "Beach House", startDate: "2024-01-01", endDate: "2024-01-10"
            })
            expect(createResponse.statusCode).toBe(200)
            const listResponse = await request(app).get("/reservations")
            expect(createResponse.statusCode)
        })
        // test("should specify json in the content type header", async () => {
        //     const response = await request(app).post("/reservations").send({
        //         'message' : 'reservation successful'
        //     })
        //     expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        // })
        test("shouldn't be able to create a reservation if there is a date conflict", async () => {
            const response = await request(app).post("/reservations").send({
                
            })
            expect(response.statusCode).toBe(400)
        })
    })

})


/* import {createServer} from '@exmpl/utils/server'

let server: Express

beforeAll(async () => {
    server = await createServer()
})

describe('GET /', () => {
    it('should return 200 & valid response if request param list is empity', async done => {
        request(server)
            .get(`/`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject({'message': 'Hello, stranger!'})
        done()
        })
    })

    it('should return 200 & valid response if name param is set', async done => {
        request(server)
            .get(`/?name=Test%20Name`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject({'message': 'Hello, Test Name!'})
        done()
        })
    })

    it('should return 400 & valid error response if name param is empty', async done => {
        request(server)
            .get(`/?name=`)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject({'error': {
            type: 'request_validation', 
            message: expect.stringMatching(/Empty.*\'name\'/), 
            errors: expect.anything()
        }})
            done()
        })
    })
})

// unit test is testing a single fucntion

//integration test is testing the complete app */