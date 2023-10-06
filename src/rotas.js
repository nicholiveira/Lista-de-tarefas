const express = require('express');
const { criar_id, criar_tarefas, excluir_tarefa } = require('./controladores/controle')

const rotas = express();

rotas.post('/conta', criar_id)
rotas.post('/tarefas/:id', criar_tarefas)
rotas.delete('/tarefas/:id/:id_tarefa', excluir_tarefa)

module.exports = rotas;