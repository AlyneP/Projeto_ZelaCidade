# 🏙️ API ZelaCidade 

## 📌 Sobre o Projeto

A API **ZelaCidade** é uma API para registrar e gerenciar problemas urbanos como:

- Buraco
- Vazamentos
- Lixo
- Iluminação

Ela permite criar, visualizar, atualizar e deletar ocorrências.

## 🛠️ Tecnologias Utilizadas

- Node.js
- Postman
- Express
- SQLite
- SQLite3

--- 

## 📦 Instalação

```bash
npm install 
```

---

## ▶️ Como Executar

```bash
npm run dev
```

Servidor disponível em: http://localhost:3000

---

## 🗄️ Banco de Dados

O banco de dados é criado automaticamente ao iniciar o projeto.

```
database.db
```

### 🧾 Tabela

| Campo             | Descrição                 | 
|-------------------|---------------------------|
|id                 | Identificador Único       |
|tipo_problema      | Tipo do problema          |
|localizacao        | Onde ocorreu              |
|descricao          | Detalhes do incidente     |
|prioridade         | Baixa, Média ou Alta      |
|nome_solicitante   | Quem registrou            |
|data_registro      | Data do registro          |
|hora_registro      | Hora do registro          |
|status_resolucao   | Status (padrão: Pendente) |
|imagem_problema    | URL da imagem             |


## 🔗 Endpoints

### Rota Inicial

```http
GET /
```
Retorna uma página HTML simples com informações da API

---

### Rota para listar todos os incidentes

```http
GET /incidentes
```
Retorna todos os registros do banco de dados

### pra buscar um incidente por ID

```http
GET /incidentes/:id
```
Exemplo:

```
/incidentes/1
```

### Rota para criar um novo incidente

```http
POST /incidentes
```

#### Body (JSON) :

```json
{
"tipo_problema": "Queda de Luz",
"localizacao": "Praça da Luz, SN",
"descricao": "",
"prioridade": "Média",
"nome_solicitante": "Bruno Wallace",
"contato_solicitante": "21900000012",
"data_registro": "23-03-2026",
"hora_registro": "10:26",
"imagem_problema": "https://jpimg.com.br/uploads/2024/10/apagao-676x450.jpg"
}
```

### Rota para atualizar um incidente

```http
PUT /incidentes/:id
```

#### Body (JSON):

```json
{
    "descricao": "Os itens foram resgatados",
    "prioridade": "Baixa",
    "status_resolucao": "Resolvido"
}
```

### Rota para deletar um incidente

```http
DELETE /incidentes/:id
```
---

## 🔐 Segurança

A API utiliza `?` nas queries SQL:

```sql
WHERE id = ?
```

Isso evita o SQL Injection 

---

## 📚 Conceitos

- CRUD (Create, Read, Update e Delete)
- Rotas com express
- Métodos/Verbos HTTP (GET, POST, PUT, DELETE)
- Banco de dados SQLite
- SQL básico
- Uso de `req.params` e `req.body`

---

## 🎯 Observações

- O banco é criado automaticamente 
- Dados iniciais são inseridos apenas se estiver vazio
- A API pode ser testada com o Postman

---

## 👩‍💻 Projeto educacional

Este projeto foi desenvolvido para fins de aprendizado em back-end com Node.js