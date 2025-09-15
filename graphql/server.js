
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

async function start() {
  const app = express();

  // Middleware para extrair usuário do Bearer Token
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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ usuario: req.usuario || null })
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.GRAPHQL_PORT || 4000;
  app.listen(PORT, () => {
    console.log(`[GraphQL] Servindo em http://localhost:${PORT}/graphql`);
  });
}

start();
