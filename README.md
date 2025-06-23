
# Mandarito Restaurante - Sistema de Pedidos

Sistema de gerenciamento de pedidos, produtos e usuários, com autenticação (JWT) e controle de permissões (admin e usuário).

## Tecnologias Utilizadas

- **Backend:** Node.js, Express, MySQL, Sequelize
- **Frontend:** React, TailwindCSS, Axios
- **Autenticação:** JWT
- **ORM:** Sequelize

---

## Como Rodar o Projeto

## Configurar o Backend

### Acessar a pasta do backend:

```
cd server
```

### Instalar dependências:

```
npm install
```

### Configurar o banco de dados:

1. Crie um banco no MySQL:

```
CREATE DATABASE restaurante_db;
```

2. Configure o arquivo `.env` na raiz da pasta `server` com seus dados de acesso:

```
DB_NAME=restaurante_db
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
JWT_SECRET=sua_chave_secreta
```

### 🔹 Executar as Migrations:

```
npx sequelize-cli db:migrate
```

### Rodar o backend:

```
npm run dev
```
---

## Configurar o Frontend

### Acessar a pasta do frontend:

```
cd client
```

### Instalar dependências:

```
npm install
```

### Rodar o frontend:

```
npm run dev
```
---

##  Acesso

- Ao registrar, o usuário é criado como padrão (`role: user`).
- Para definir um usuário como admin, atualize direto no banco:

---

## 🗺️ Funcionalidades

- ✅ Cadastro e login de usuários com JWT
- ✅ Controle de permissões (admin e usuário)
- ✅ CRUD de produtos
- ✅ CRUD de pedidos
- ✅ Admin vê todos os pedidos, usuários veem apenas os seus

