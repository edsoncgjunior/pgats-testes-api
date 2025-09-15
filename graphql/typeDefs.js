
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Transferencia {
    id: ID!
    de: String!
    para: String!
    valor: Float!
    criadoPor: String!
    data: String!
  }

  type Query {
    transferencias: [Transferencia!]!
  }

  type Mutation {
    criarTransferencia(de: String!, para: String!, valor: Float!): Transferencia!
  }
`;
