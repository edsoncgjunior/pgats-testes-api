
const sinon = require('sinon');
const { expect } = require('chai');
const ctrl = require('../controladores/transferenciaControlador');
const servico = require('../servicos/transferenciaServico');

function fakeRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(obj) { this.body = obj; return this; }
  };
}

describe('Controller - transferência (com Sinon)', function() {
  afterEach(() => sinon.restore());

  it('retorna 201 quando criação ok', function() {
    const req = { body: { de: 'Edson', para: 'Edson2', valor: 50 }, usuario: { email: 'edson@teste.com' } };
    const res = fakeRes();
    const stub = sinon.stub(servico, 'criarTransferencia').returns({ id: 1, de: 'Edson', para: 'Edson2', valor: 50, criadoPor: 'edson@teste.com', data: '...' });
    ctrl.criar(req, res);
    expect(stub.calledOnce).to.be.true;
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property('id', 1);
  });

  it('retorna 400 quando serviço lança DADOS_INVALIDOS', function() {
    const req = { body: { de: '', para: '', valor: -1 }, usuario: { email: 'edson@teste.com' } };
    const res = fakeRes();
    const err = new Error('Dados inválidos'); err.codigo = 'DADOS_INVALIDOS';
    sinon.stub(servico, 'criarTransferencia').throws(err);
    ctrl.criar(req, res);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property('erro');
  });

  it('listar retorna 200 e array', function() {
    const req = { };
    const res = fakeRes();
    sinon.stub(servico, 'listarTransferencias').returns([{ id: 1 }]);
    ctrl.listar(req, res);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
