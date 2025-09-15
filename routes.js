
const express = require('express');
const router = express.Router();
const authCtrl = require('./controladores/authControlador');
const transfCtrl = require('./controladores/transferenciaControlador');
const autenticar = require('./middleware/autenticarToken');

// Saúde
router.get('/saude', (req, res) => res.json({ status: 'ok' }));

// Autenticação
router.post('/login', authCtrl.login);

// Recursos protegidos
router.post('/transferencias', autenticar, transfCtrl.criar);
router.get('/transferencias', autenticar, transfCtrl.listar);

module.exports = router;
