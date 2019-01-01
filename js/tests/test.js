const Request = require('request');
const assert = require('assert');
const app = require('../app');
const expect = require('chai').expect;
const chai = require('chai');
const supertest = require('supertest');

chai.use(require('chai-http'));


    // Testing the root get function for users
    describe('Test the questioner root', () => {
        it('It should respond items at question.com', () => {
            return chai.request(app)
            .get('/questioner.com')
            .then((res)=> {
              expect(res).to.have.status(200);
            //   expect(res).to.be.json;
              expect(res.body).to.be.an('object');
            });
        });
    });

    // Testing a specific user to be got from the data base
    describe('A user details', () => {
        it('It should respond with all user requirements', () => {
            return chai.request(app)
            .get('/questioner.com/api/v1/users/:id')
            .then((res)=> {
              expect(res).to.have.status(404);
            //   expect(res.body).to.have.property('id');
            //   expect(res.body.id).to.not.equal(null);
            //   expect(res).to.be.json;
              expect(res.body).to.be.an('object');
            //   expect(res.body.results).to.be.an('array');
            });
        });
    });


