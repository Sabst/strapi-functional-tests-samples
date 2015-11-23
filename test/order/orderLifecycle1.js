'use strict';

const supertest = require('supertest'); // SuperAgent-driven library for testing HTTP servers
const chai = require('chai');  // BDD/TDD assertion library
const should = chai.should();

const StrapiServerUtils = require('../utils/strapiServer');

// Same value as in test environment configuration
//   (duplicated until we find how to get it from server config... when we are not in the server!)
var baseUri = "http://localhost:1338";

describe('first order lifecycle test', function() {

  var userJwt;
  var order1Id;

  before(function(done) {
    StrapiServerUtils.start(done);
  });

  after(function(done) {
    StrapiServerUtils.stop(done);
  });

  it('should register a new user', function * (done) {
    try {
      let response = yield supertest.agent(baseUri).post('/auth/local/register')
        .type('json')
        .send({username: "John Tester", email: "test@company.com", password: "123456"});

      response.status.should.equal(200, response.text);
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should log this user in', function * (done) {
    try {
      let response = yield supertest.agent(baseUri).post('/auth/local')
        .type('json')
        .send({identifier: "test@company.com", password: "123456"});

      response.status.should.equal(200, response.text);
      userJwt = response.body.jwt;
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should create a new order', function * (done) {
    try {
      let response = yield supertest.agent(baseUri).post('/order')
        .type('json')
        .send({token: userJwt, name: 'One order...', quantity: 42});

      response.status.should.equal(201, response.text);
      order1Id = response.body.id;

      response = yield supertest.agent(baseUri).get('/order/' + order1Id)
        .type('json')
        .send({token: userJwt});

      response.status.should.equal(200, response.text);
      should.not.exist(response.body.confirmationDate);
      should.not.exist(response.body.paymentDate);

      done();
    } catch(err) {
      done(err);
    }
  });

  it('should confirm the order', function * (done) {
    try {
      let response = yield supertest.agent(baseUri).put('/order/' + order1Id + '/confirm')
        .type('json')
        .send({token: userJwt});

      response.status.should.equal(200, response.text);
      order1Id = response.body.id;

      response = yield supertest.agent(baseUri).get('/order/'+order1Id)
        .type('json')
        .send({token: userJwt});

      response.status.should.equal(200, response.text);
      should.exist(response.body.confirmationDate);
      should.not.exist(response.body.paymentDate);

      done();
    } catch(err) {
      done(err);
    }
  });

  it('should pay the order', function * (done) {
    try {
      let response = yield supertest.agent(baseUri).put('/order/' + order1Id + '/pay')
        .type('json')
        .send({token: userJwt});

      response.status.should.equal(200, response.text);
      order1Id = response.body.id;

      response = yield supertest.agent(baseUri).get('/order/'+order1Id)
        .type('json')
        .send({token: userJwt});

      response.status.should.equal(200, response.text);
      should.exist(response.body.confirmationDate);
      should.exist(response.body.paymentDate);

      done();
    } catch(err) {
      done(err);
    }
  });

  it('should reset the order', function * (done) {
    try {
      let response = yield supertest.agent(baseUri).put('/order/' + order1Id + '/reset')
        .type('json')
        .send({token: userJwt});

      response.status.should.equal(200, response.text);
      order1Id = response.body.id;

      response = yield supertest.agent(baseUri).get('/order/'+order1Id)
        .type('json')
        .send({token: userJwt});

      response.status.should.equal(200, response.text);
      should.not.exist(response.body.confirmationDate);
      should.not.exist(response.body.paymentDate);

      done();
    } catch(err) {
      done(err);
    }
  });

});
