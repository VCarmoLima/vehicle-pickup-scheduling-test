<?php

namespace App\Config;

use PDO;
use PDOException;

class Database
{
    private ?PDO $conn = null;

    public function getConnection(): PDO
    {
        if ($this->conn === null) {
            try {
                $host = $_ENV['DB_HOST'];
                $port = $_ENV['DB_PORT'];
                $db_name = $_ENV['DB_DATABASE'];
                $username = $_ENV['DB_USERNAME'];
                $password = $_ENV['DB_PASSWORD'];

                $dsn = "mysql:host={$host};port={$port};dbname={$db_name};charset=utf8mb4";

                $this->conn = new PDO($dsn, $username, $password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]);
            } catch (PDOException $exception) {
                http_response_code(500);
                echo json_encode(["error" => "Database connection failed"]);
                exit;
            }
        }

        return $this->conn;
    }
}