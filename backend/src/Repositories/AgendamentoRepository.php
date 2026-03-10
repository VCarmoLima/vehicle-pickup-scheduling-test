<?php

namespace App\Repositories;

use PDO;
use App\Config\Database;

class AgendamentoRepository
{
    private PDO $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function findBookedTimesByDate(string $date): array
    {
        $query = "SELECT DATE_FORMAT(data_hora, '%H:%i') as hora FROM agendamentos WHERE DATE(data_hora) = :data";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':data', $date);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
}