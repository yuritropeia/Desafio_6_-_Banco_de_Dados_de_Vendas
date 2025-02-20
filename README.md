# Sales DB

Este é um projeto de um banco de dados de vendas de uma empresa ficticia onde se pode operar o CRUD para clientes, produtos, estoque, pedidos e vendas.

### Pré-requisitos

- Node.js (v14.x ou superior)
- npm (Node Package Manager) ou yarn

## Tecnologias Utilizadas

- Node.js
- Express.js
- SQLite (ou outro banco de dados de sua escolha)
- Zod para validação de esquemas de dados

Banco de Dados de Vendas

📌 Descrição

Este projeto implementa um banco de dados para gerenciamento de um sistema de vendas online. O banco de dados inclui tabelas para produtos, clientes, pedidos, vendas e estoque, além de triggers para garantir a integridade dos dados e automação de processos.

🛠️ Tecnologias Utilizadas

MySQL para armazenamento dos dados

SQL para criação das tabelas, inserção de dados e gerenciamento de transações

Triggers para automação de atualizações no estoque e status dos pedidos

📋 Estrutura do Banco de Dados

O banco de dados é composto pelas seguintes tabelas:

🏷️ Produtos (produtos)

Armazena as informações dos produtos disponíveis para venda.

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL
);

👤 Clientes (clientes)

Contém os dados dos clientes cadastrados.

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT
);

🛍️ Pedidos (pedidos)

Registra os pedidos feitos pelos clientes.

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    produto_id INT,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'processando', 'enviado', 'entregue', 'cancelado') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);

💰 Vendas (vendas)

Tabela que armazena as vendas realizadas com os valores calculados.

CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
);

📦 Estoque (estoque)

Gerencia o estoque de produtos.

CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT UNIQUE,
    quantidade INT NOT NULL,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);

🔥 Triggers Implementados

1️⃣ Atualizar a data de atualização do estoque automaticamente

CREATE TRIGGER atualizar_data_estoque
BEFORE UPDATE ON estoque
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP;
END;

2️⃣ Verificar estoque antes de inserir um pedido

DELIMITER $$
CREATE TRIGGER verificar_estoque_antes_pedido
BEFORE INSERT ON pedidos
FOR EACH ROW
BEGIN
    DECLARE estoque_atual INT;
    SELECT quantidade INTO estoque_atual FROM estoque WHERE produto_id = NEW.produto_id;
    IF estoque_atual IS NULL OR estoque_atual < NEW.quantidade THEN
        SET NEW.status = 'cancelado';
    ELSE
        SET NEW.status = 'processando';
        UPDATE estoque 
        SET quantidade = quantidade - NEW.quantidade 
        WHERE produto_id = NEW.produto_id;
    END IF;
END $$
DELIMITER ;

3️⃣ Calcular automaticamente o total da venda

DELIMITER $$
CREATE TRIGGER calcular_total_venda
AFTER INSERT ON pedidos
FOR EACH ROW
BEGIN
    IF NEW.status <> 'cancelado' THEN
        INSERT INTO vendas (pedido_id, total)
        VALUES (NEW.id, NEW.quantidade * NEW.preco_unitario);
    END IF;
END $$
DELIMITER ;

🚀 Como Executar o Projeto

1️⃣ Instalar o MySQL

Caso ainda não tenha o MySQL instalado, siga as instruções no site oficial.

2️⃣ Criar o Banco de Dados

Execute o seguinte comando no MySQL:

CREATE DATABASE vendas;
USE vendas;

3️⃣ Executar o Script SQL

No MySQL Workbench ou terminal, execute o arquivo SQL contendo a estrutura do banco:

mysql -u usuario -p vendas < script.sql

📜 Licença

Este projeto é distribuído sob a licença MIT.
