<?php

namespace App\Repositories;

use PDO;
use PDOException;
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

    public function create(int $veiculoId, int $usuarioId, string $dataHora): bool
    {
        try {
            $query = "INSERT INTO agendamentos (veiculo_id, usuario_id, data_hora) VALUES (:veiculo_id, :usuario_id, :data_hora)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':veiculo_id', $veiculoId, PDO::PARAM_INT);
            $stmt->bindParam(':usuario_id', $usuarioId, PDO::PARAM_INT);
            $stmt->bindParam(':data_hora', $dataHora);

            return $stmt->execute();
        } catch (PDOException $e) {
            return false;
        }
    }
}