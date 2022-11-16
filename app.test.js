const request= require('supertest')
const app =require('./testapp.js') 


describe("POST /users/register", ()=>{

    describe('given email, username, password', ()=>{

        let user= {               
            email: "email",
            username: "username",
            password: "password"
        }

        //respond with statuscode 200
        test("should respond with a 201 status code", async()=>{
            const response= await request(app).post('/users/register').send(user).type('form') 
            expect(response.statusCode).toBe(201)   
        })
        
        //should specify json in content type header
        test("should specify json in content type header", async()=>{
            const response= await request(app).post('/users/register').send(user).type('form')  
            expect(response.headers['content-type']).toMatch(/json/) 
        })
    })
})


describe("POST /users/login", ()=>{

    describe('given email and password', ()=>{

        let user= {               
            email: "email",
            password: "password"
        }

        //respond with statuscode 200
        test("should respond with a 200 status code", async()=>{
            const response= await request(app).post('/users/login').send(user).type('form') 
            expect(response.statusCode).toBe(200)   
        })
        
        //should specify json in content type header
        test("should specify json in content type header", async()=>{
            const response= await request(app).post('/users/login').send(user).type('form')  
            expect(response.headers['content-type']).toMatch(/json/) 
        })
    })
})

describe("GET /view-account", ()=>{

    describe('given amount', ()=>{
        //save email, username and password
        //respond with json object
        

        let data= {       
            amount: 500,
            account_to_id: 17
        }
        let token= 23

        //respond with statuscode 200
        test("should respond with a 200 status code", async()=>{
            
            const response= await request(app).get('/view-account').set('Authorization', token)
            expect(response.statusCode).toBe(200)   
        })
        
        //should specify json in content type header
        test("should specify json in content type header", async()=>{
            const response= await request(app).get('/view-account').set('Authorization', token)
            expect(response.headers['content-type']).toMatch(/json/) 
        })
    })
})

describe("POST /transactions/withdraw", ()=>{

    describe('given amount', ()=>{
        

        let data= {       
            amount: 500
        }
        let token= 23

        //respond with statuscode 200
        test("should respond with a 200 status code", async()=>{
            
            const response= await request(app).post('/transactions/withdraw').set('Authorization', token).send(data).type('form')
            expect(response.statusCode).toBe(200)   
        })
        
        //should specify json in content type header
        test("should specify json in content type header", async()=>{
            const response= await request(app).post('/transactions/withdraw').set({autorization: token}).send(data).type('form')
            expect(response.headers['content-type']).toMatch(/json/) 
        })
    })
})

describe("POST /transactions/deposit", ()=>{

    describe('given amount', ()=>{
        
        let data= {       
            amount: 500
        }
        let token= 23

        //respond with statuscode 200
        test("should respond with a 200 status code", async()=>{
            
            const response= await request(app).post('/transactions/deposit').set('Authorization', token).send(data).type('form')
            expect(response.statusCode).toBe(200)   
        })
        
        //should specify json in content type header
        test("should specify json in content type header", async()=>{
            const response= await request(app).post('/transactions/deposit').set({autorization: token}).send(data).type('form')
            expect(response.headers['content-type']).toMatch(/json/) 
        })
    })
})



describe("POST /transactions/transfer", ()=>{

    describe('given amount', ()=>{
        //save email, username and password
        //respond with json object
        

        let data= {       
            amount: 500,
            account_to_id: 17
        }
        let token= 23

        //respond with statuscode 200
        test("should respond with a 200 status code", async()=>{
            
            const response= await request(app).post('/transactions/transfer').set('Authorization', token).send(data).type('form')
            expect(response.statusCode).toBe(200)   
        })
        
        //should specify json in content type header
        test("should specify json in content type header", async()=>{
            const response= await request(app).post('/transactions/transfer').set({autorization: token}).send(data).type('form')
            expect(response.headers['content-type']).toMatch(/json/) 
        })
    })
})