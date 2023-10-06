const { usuarios, tarefas } = require('./bancodedados');

let numero_id = 1;

const criar_id = (req, res) => {
    const { nome, sobrenome, email } = req.body;
    try {
        if (!nome || !sobrenome || !email) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }
        if (!email.includes('@')) {
            return res.status(400).json({ mensagem: 'email inválido.' });
        }
        const duplicidadeEncontrada = usuarios.some(usuario => usuario.email === email);
        if (duplicidadeEncontrada) {
            return res.status(400).json({ mensagem: "Email informado já existe cadastrado!" });
        }

        const novo_id = {
            id: numero_id,
            nome,
            sobrenome,
            email
        }
        usuarios.push(novo_id);
        numero_id++

        return res.status(201).send(usuarios);
    } catch (erro) {
        return res.status(500).json(erro.message);
    }
}

let id_tarefa = 1;
const criar_tarefas = (req, res) => {
    const { id } = req.params;
    const { nome_tarefa, descricao_tarefa } = req.body;

    try {
        const numeroConta = Number(id);

        const numero = usuarios.find((usuario) => {
            return usuario.id === numeroConta
        });

        if (isNaN(numeroConta)) {
            return res.status(400).json({ mensagem: 'O número da conta informado não é válido.' });
        }
        if (!nome_tarefa || !descricao_tarefa) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        }
        if (!numero) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        }

        let data = new Date();
        let dataFormatada = data.getDate() + "-" + (data.getMonth() + 1) + "-" + data.getFullYear();

        const registro_tarefa = {
            id: id_tarefa,
            nome_tarefa,
            descricao_tarefa,
            dataFormatada
        }
        tarefas.push(registro_tarefa);
        id_tarefa++

        return res.status(203).send(tarefas);
    } catch (erro) {
        return res.status(500).json(erro.message);
    }
}

const excluir_tarefa = (req, res) => {
    const idRequisitado = Number(req.params.id);
    const id_tarefa = Number(req.params.id_tarefa);

    if (isNaN(idRequisitado)) {
        return res.status(400).json({ mensagem: 'O id de usuario informado não é um número válido.' });
    }
    if (isNaN(id_tarefa)) {
        return res.status(400).json({ mensagem: 'O id da tarefa informado não é um número válido.' });
    }
    const indice_id = usuarios.findIndex(usuario => usuario.id === idRequisitado);
    const indice_tarefa = tarefas.findIndex(tarefa => tarefa.id_tarefa === id_tarefa);

    if (indice_id < 0) {
        return res.status(404).json({ mensagem: 'Id não encontrado.' });
    }
    if (indice_tarefa < 0) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
    }

    const tarefa_Excluido = tarefas.splice(indice_tarefa, 1)[0];
    return res.json(tarefa_Excluido);
}

module.exports = {
    criar_id,
    criar_tarefas,
    excluir_tarefa
}
