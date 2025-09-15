
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swagger = require('./swagger.json');
const rotas = require('./routes');
const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));
app.use('/api', rotas);
app.get('/', (req, res) => res.json({ ok: true, mensagem: 'API Edson - online' }));
module.exports = app;
