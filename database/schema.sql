CREATE DATABASE IF NOT EXISTS agendamentos_db;
USE agendamentos_db;

CREATE TABLE veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    versao VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    imagem_url VARCHAR(255) NOT NULL,
    localizacao VARCHAR(150) NOT NULL
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    veiculo_id INT NOT NULL,
    usuario_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    UNIQUE KEY unique_data_hora (data_hora)
);

INSERT INTO veiculos (modelo, versao, preco, imagem_url, localizacao)
VALUES ('Fiat Argo', 'REX FULL 8V ELÉTRICO 4P AUTOMÁTICO', 13700.00, 'https://placehold.co/600x400/eeeeee/31343c/png?text=Fiat+Argo', 'Mogi das Cruzes - SP');