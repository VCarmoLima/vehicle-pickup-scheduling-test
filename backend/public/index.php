<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Bramus\Router\Router;
use Dotenv\Dotenv;
use App\Config\Database;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$router = new Router();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

$router->get('/api/status', function () {
    $db = new Database();
    $conn = $db->getConnection();

    if ($conn) {
        http_response_code(200);
        echo json_encode(["status" => "API online e Banco de Dados conectado com sucesso!"]);
    }
});

$router->set404(function () {
    http_response_code(404);
    echo json_encode(["error" => "Rota nao encontrada"]);
});

$router->get('/api/veiculo/(\d+)', '\App\Controllers\VeiculoController@show');
$router->get('/api/disponibilidade', '\App\Controllers\AgendamentoController@disponibilidade');
$router->post('/api/agendamentos', '\App\Controllers\AgendamentoController@store');

$router->run();