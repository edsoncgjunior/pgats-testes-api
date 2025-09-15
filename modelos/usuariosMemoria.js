
const bcrypt = require('bcryptjs');
// Usuários "manuais" com nomes em PT-BR
const usuarios = [
  { id: 1, nome: 'Edson', email: 'edson@teste.com', senhaHash: bcrypt.hashSync('edson123', 8) },
  { id: 2, nome: 'Edson2', email: 'edson2@teste.com', senhaHash: bcrypt.hashSync('edson456', 8) }
];
module.exports = { usuarios };
