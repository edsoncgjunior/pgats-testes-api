
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('REST External - fluxo completo', function() {
  let token;
  it('login com sucesso (Edson)', async function() {
    const res = await request(app).post('/api/login').send({ email: 'edson@teste.com', senha: 'edson123' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    token = res.body.token;
  });

  it('bloqueia rota protegida sem token', async function() {
    const res = await request(app).get('/api/transferencias');
    expect(res.status).to.equal(401);
  });

  it('cria transferência com token', async function() {
    const res = await request(app)
      .post('/api/transferencias')
      .set('Authorization', `Bearer ${token}`)
      .send({ de: 'Edson', para: 'Edson2', valor: 123.45 });
    expect(res.status).to.equal(201);
    expect(res.body).to.include({ de: 'Edson', para: 'Edson2' });
    expect(res.body).to.have.property('valor', 123.45);
  });

  it('lista transferências com token', async function() {
    const res = await request(app)
      .get('/api/transferencias')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });
});
