<?php

namespace App\Repositories;

use PDO;
use App\Config\Database;

class VeiculoRepository
{
    private PDO $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function findById(int $id): ?array
    {
        $query = "SELECT id, modelo, versao, preco, imagem_url, localizacao FROM veiculos WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ?: null;
    }
}