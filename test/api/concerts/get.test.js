const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConcOne = new Concert({ performer: 'John Doe', price: 25, genre: 'Rock', day: 1, image: 'Test' });
    await testConcOne.save();

    const testConcTwo = new Concert({ performer: 'Amanda Jefferson', price: 40, genre: 'Pop', day: 2, image: 'Test2' });
    await testConcTwo.save();
  });
  after(async () => {
    await Concert.deleteMany();
  });

  it('should get documents by perforemer', async () => {
    const res = await request(server).get('/api/concerts/performer/John Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('should get documents by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('should get documents by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('should get documents by price in range min to max', async () => {
    const res = await request(server).get('/api/concerts/price/25/40');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
});