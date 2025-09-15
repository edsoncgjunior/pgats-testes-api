
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { usuarios } = require('../modelos/usuariosMemoria');

async function login(req, res) {
  const { email, senha } = req.body || {};
  const user = usuarios.find(u => u.email === email);
  if (!user) return res.status(401).json({ erro: 'Credenciais inválidas' });
  const ok = await bcrypt.compare(senha || '', user.senhaHash);
  if (!ok) return res.status(401).json({ erro: 'Credenciais inválidas' });
  const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, process.env.JJWT_SECRET || 'segredo-edson-muito-seguro', { expiresIn: '1h' });
  return res.json({ token });
}

module.exports = { login };
