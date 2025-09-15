
const servico = require('../servicos/transferenciaServico');

module.exports = {
  Query: {
    transferencias: (_, __, ctx) => {
      if (!ctx.usuario) throw new Error('Não autenticado');
      return servico.listarTransferencias();
    }
  },
  Mutation: {
    criarTransferencia: (_, args, ctx) => {
      if (!ctx.usuario) throw new Error('Não autenticado');
      return servico.criarTransferencia({ ...args, criadoPor: ctx.usuario.email });
    }
  }
};
