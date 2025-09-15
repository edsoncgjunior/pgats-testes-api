
const request = require('supertest');
const { expect } = require('chai');
const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers');
const jwt = require('jsonwebtoken');

describe('GraphQL External - queries e mutations', function() {
  let app, serverUrl, httpServer;

  before(async function() {
    app = express();
    const apollo = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ usuario: req.usuario || null })
    });
    await apollo.start();

    // middleware para auth Bearer
    app.use((req, res, next) => {
      const auth = req.headers['authorization'] || '';
      const token = auth.startsWith('Bearer ') ? auth.substring(7) : null;
      if (token) {
        try {
          req.usuario = jwt.verify(token, process.env.JJWT_SECRET || 'segredo-edson-muito-seguro');
        } catch {}
      }
      next();
    });

    apollo.applyMiddleware({ app, path: '/graphql' });
    httpServer = http.createServer(app);
    await new Promise(resolve => httpServer.listen(0, resolve)); // porta aleatória
    const { port } = httpServer.address();
    serverUrl = `http://127.0.0.1:${port}/graphql`;
  });

  after(async function() {
    if (httpServer) await new Promise(resolve => httpServer.close(resolve));
  });

  it('nega acesso sem token', async function() {
    const res = await request(serverUrl)
      .post('')
      .send({ query: '{ transferencias { id de para valor criadoPor data } }' });
    expect(res.body).to.have.nested.property('errors[0].message', 'Não autenticado');
  });

  it('cria e lista com token válido', async function() {
    const token = jwt.sign({ id: 1, nome: 'Edson', email: 'edson@teste.com' }, process.env.JJWT_SECRET || 'segredo-edson-muito-seguro', { expiresIn: '1h' });
    const criar = await request(serverUrl)
      .post('')
      .set('Authorization', 'Bearer ' + token)
      .send({ query: 'mutation { criarTransferencia(de:"Edson", para:"Edson2", valor: 10.5){ id de para valor criadoPor } }' });
    expect(criar.body).to.not.have.property('errors');
    expect(criar.body.data.criarTransferencia.de).to.equal('Edson');

    const listar = await request(serverUrl)
      .post('')
      .set('Authorization', 'Bearer ' + token)
      .send({ query: '{ transferencias { id de para valor criadoPor } }' });
    expect(listar.body).to.not.have.property('errors');
    expect(listar.body.data.transferencias).to.be.an('array');
    expect(listar.body.data.transferencias.length).to.be.greaterThan(0);
  });
});
