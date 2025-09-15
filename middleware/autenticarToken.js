
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function autenticarToken(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.substring(7) : null;
  if (!token) return res.status(401).json({ erro: 'Token ausente' });
  try {
    const payload = jwt.verify(token, process.env.JJWT_SECRET || 'segredo-edson-muito-seguro');
    req.usuario = payload;
    next();
  } catch (e) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};
