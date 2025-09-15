
const { transferencias } = require('../modelos/transferenciasMemoria');

function criarTransferencia({ de, para, valor, criadoPor }) {
  if (!de || !para || typeof valor !== 'number' || valor <= 0) {
    const erro = new Error('Dados inválidos para transferência');
    erro.codigo = 'DADOS_INVALIDOS';
    throw erro;
  }
  const nova = {
    id: transferencias.length + 1,
    de, para, valor,
    criadoPor,
    data: new Date().toISOString()
  };
  transferencias.push(nova);
  return nova;
}

function listarTransferencias() {
  return transferencias;
}

module.exports = { criarTransferencia, listarTransferencias };
