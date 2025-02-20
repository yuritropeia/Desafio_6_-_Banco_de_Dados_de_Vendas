# Sales DB - Gerenciamento de Vendas Online

Este é um projeto de um banco de dados para gerenciamento de um sistema de vendas online. O banco de dados inclui tabelas para produtos, clientes, pedidos, vendas e estoque, podendo operar o CRUD nelas.

### Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- Node.js (v14.x ou superior)
- npm (Node Package Manager) ou yarn
- MySQL ou SQLite
- Thunder Client (modo free, sujeito a limitações de requisições)

## Tecnologias Utilizadas

- Node.js - Plataforma para execução de código JavaScript no backend
- Express.js - Framework minimalista para criação de APIs
- SQLite (ou outro banco de dados relacional como MySQL) - Banco de dados relacional
- SQL - Linguagem para criação e manipulação de dados
- Zod - Validação de esquemas de dados
- Thunder Client - Ferramenta para testes de requisições de API

## 🏗️ Estrutura do Banco de Dados

### 🏷️ Produtos (products)

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE,
        descrition TEXT,
        price DECIMAL(10,2) NOT NULL
    );

### 👤 Clientes (clients)

    CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL
    );

### 🛍️ Pedidos (orders)

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientId INT NOT NULL,
      productId INT NOT NULL,
      quantity INT NOT NULL,
      order_date TEXT DEFAULT (strftime('%d-%m-%Y', 'now')),
      status TEXT NOT NULL CHECK(status IN ('pending', 'delivered', 'cancelled')),
      FOREIGN KEY (clientId) REFERENCES clients(id),
      FOREIGN KEY (productId) REFERENCES products(id)
    );

### 💰 Vendas (sales)

    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INT UNIQUE NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        sale_date TEXT DEFAULT (strftime('%d-%m-%Y', 'now')),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );

### 📦 Estoque (stock)

    CREATE TABLE IF NOT EXISTS stock (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INT UNIQUE NOT NULL,
        quantity INT NOT NULL,
        update_date TEXT DEFAULT (strftime('%d-%m-%Y', 'now')),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

## 🛠️ Testando as Requisições

As requisições podem ser feitas utilizando o Thunder Client no modo free, que possui limitações no número de requisições.
