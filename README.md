# 📝 To Do List

Uma aplicação de criação, edição e administração de tarefas.

Este repositório tem como objetivo principal o desenvolvimento de uma **API CRUD**, servindo como um aprendizado de criações de rotas, autenticação com JWT e integração de banco de dados relacional.


## 🔖 Badges

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## 🔧 Tecnologias Utilizadas

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="40px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40px" />
</p>

- Back-end: Node.js, Express
- Banco de dados: PostgreSQL
- Autenticação: JWT (JSON Web Tokens)
- Front-end: React (interface simples para testes)

## 📦 Funcionalidades 

### Autenticação
- Registro de usuário
- Login com geração de token JWT
- Proteção de rotas com middleware de autenticação

### Tarefas
- Criar, listar, atualizar e remover tarefas (CRUD)
- Atribuir uma categoria a cada tarefa

### Categorias

- Criar e remover categorias
- Associação entre tarefas e categorias


## 🗃️ Banco de dados

O projeto utiliza **PostgreSQL** com as seguintes tabelas:

- **users**
- **tasks**
- **categories**

As relações estão organizadas para refletir o vínculo entre usuários, tarefas e categorias.

## Como executar o projeto

### Pré-requisitos:
- NodeJs
- PostgreSQL

### Rodando o back-end
```bash
# Clone o repositório
git clone https://github.com/AqueleGabrielLa/to-do-list.git

# Acesse a pasta do back-end
cd to-do-list/back-end

# Instale as dependências
npm install

# Configure o banco de dados (crie o `.env` com as variáveis)

# Crie as tabelas e o tipo ENUM no banco executando o arquivo setupDb.js
node config/setupDb.js

# Inicie o servidor
npm run dev
```

### Rodando o front-end (opcional)

```bash
# Acesse a pasta do front
cd front-end

# Instale as dependências
npm install

# Inicie o servidor React
npm start
```


## ℹ️ Informações Adicionais
Este projeto foi desenvolvido com fins **educacionais**.
O foco principal foi a implementação do back-end, incluindo:

- Validações e autenticação JWT

- Rotas protegidas

- Estruturação de banco de dados relacional

Integração com front-end React simples, com foco apenas em testar a API