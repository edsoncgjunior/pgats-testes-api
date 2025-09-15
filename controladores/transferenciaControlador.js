
const servico = require('../servicos/transferenciaServico');

function criar(req, res) {
  try {
    const { de, para, valor } = req.body || {};
    const criadoPor = req.usuario?.email || 'desconhecido@teste.com';
    const nova = servico.criarTransferencia({ de, para, valor, criadoPor });
    return res.status(201).json(nova);
  } catch (e) {
    if (e.codigo === 'DADOS_INVALIDOS') return res.status(400).json({ erro: e.message });
    return res.status(500).json({ erro: 'Falha ao criar transferência' });
  }
}

function listar(req, res) {
  const itens = servico.listarTransferencias();
  return res.json(itens);
}

module.exports = { criar, listar };
