# Sales DB

Este é um projeto de um banco de dados para gerenciamento de um sistema de vendas online. O banco de dados inclui tabelas para produtos, clientes, pedidos, vendas e estoque, podendo operar o CRUD nelas.

### Pré-requisitos

- Node.js (v14.x ou superior)
- npm (Node Package Manager) ou yarn
- MySQL ou SQLite
- Thunder Client (modo free, sujeito a limitações de requisições)

## Tecnologias Utilizadas

- Node.js
- Express.js
- SQLite (ou outro banco de dados relacional como MySQL)
- Zod para validação de esquemas de dados

## Estrutura do Banco de Dados

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

### 🛍️ Pedidos (pedidos)

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

### 💰 Vendas (vendas)

    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INT UNIQUE NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        sale_date TEXT DEFAULT (strftime('%d-%m-%Y', 'now')),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );
