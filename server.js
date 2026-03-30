const express = require('express')

const { criarBanco } = require('./database')

const cors = require('cors') // Importando o pacote que gerencia as permissões de acesso

const app = express()

app.use(express.json())

// Ativando o CORS no nosso servidor
// Esse comando avisa ao navegador:
// Pode liberar o acesso para qualquer site que queira consultar meus dados
app.use(cors()) 

app.get('/', (req, res) => {
    res.send(`
        <body>
            <h1>Zela Cidade</h1>
            <h2>Gestão de Problemas Urbanos</h2>
            <p>Endpoint que leva aos incidentes cadastrados: /incidentes</p>
        </body>
        `)
})

app.get('/incidentes', async (req, res) => {
    const db = await criarBanco()
    const listaIncidentes = await db.all(`SELECT * FROM incidentes`)
    res.json(listaIncidentes)
})

// ROTA ESPECÍFICA: Busca apenas UM incidente pelo número do ID

app.get('/incidentes/:id', async (req, res) => {
    const { id } = req.params

    const db = await criarBanco()
    
    const incidenteEspecifico = await db.all(`SELECT * FROM incidentes WHERE id = ?`, [id])
    res.json(incidenteEspecifico)
})

// ROTA POST: Define uma rota tipo POST para o endpoint '/incidentes'
app.post('/incidentes', async (req, res) => {
    const {tipo_problema, localizacao, descricao, prioridade, nome_solicitante, contato_solicitante, data_registro, hora_registro, imagem_problema} = req.body

    const db = await criarBanco()

    await db.run(`INSERT INTO incidentes (tipo_problema, localizacao, descricao, prioridade, nome_solicitante, contato_solicitante, data_registro, hora_registro, imagem_problema) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [tipo_problema, localizacao, descricao, prioridade, nome_solicitante, contato_solicitante, data_registro, hora_registro, imagem_problema] )

    res.send(`Incidente novo registrado: ${tipo_problema} registrado na data ${data_registro} por ${nome_solicitante}`)
})

// ROTA DE ATUALIZAÇÃO: Responsável por editar um incidente já existente no banco

app.put('/incidentes/:id', async (req, res) => {

    //Pega o ID do incidente que vem pela URL. (Ex: /incidentes/11)
    const { id } = req.params 

    const { descricao, prioridade, status_resolucao} = req.body

    // Abre a conexão com o banco de dados
    const db = await criarBanco()

    await db.run(`
        UPDATE incidentes 
        SET descricao = ?, prioridade = ?, status_resolucao = ?
        WHERE id = ?
        `, [descricao, prioridade, status_resolucao, id])

    res.send(`O incidente de ID ${id} foi atualizado com sucesso`)
})

// ROTA DE REMOÇÃO: Responsável por apagar um incidente do banco de dados
app.delete('/incidentes/:id', async (req, res) => {
    const { id } = req.params
    const db = await criarBanco()
    
    await db.run(`DELETE FROM incidentes WHERE id = ?`, [id])

    res.send(`O incidente de id ${id} foi removido com sucesso`)
})

const PORT = process.env.PORT || 3000 

// dps disso vai no terminal e faz npm install sqlite@5.1.6

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})

