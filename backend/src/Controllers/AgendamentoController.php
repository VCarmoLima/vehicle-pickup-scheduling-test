<?php

namespace App\Controllers;

use App\Repositories\AgendamentoRepository;
use App\Repositories\UsuarioRepository;

class AgendamentoController
{
    private AgendamentoRepository $repository;
    private UsuarioRepository $usuarioRepository;

    public function __construct()
    {
        $this->repository = new AgendamentoRepository();
        $this->usuarioRepository = new UsuarioRepository();
    }

    public function disponibilidade(): void
    {
        $data = $_GET['data'] ?? null;

        if (!$data) {
            http_response_code(400);
            echo json_encode(["error" => "Parametro 'data' e obrigatorio (YYYY-MM-DD)"]);
            return;
        }

        $bookedTimes = $this->repository->findBookedTimesByDate($data);

        $allTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

        $availableTimes = array_values(array_diff($allTimes, $bookedTimes));

        http_response_code(200);
        echo json_encode([
            "data" => $data,
            "horarios_disponiveis" => $availableTimes
        ]);
    }

    public function store(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['veiculo_id'], $data['nome'], $data['email'], $data['telefone'], $data['data_hora'])) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos"]);
            return;
        }

        $usuarioId = $this->usuarioRepository->findIdByEmail($data['email']);

        if (!$usuarioId) {
            $usuarioId = $this->usuarioRepository->create($data['nome'], $data['email'], $data['telefone']);
        }

        $sucesso = $this->repository->create($data['veiculo_id'], $usuarioId, $data['data_hora']);

        if (!$sucesso) {
            http_response_code(400);
            echo json_encode(["error" => "Horario indisponivel ou invalido"]);
            return;
        }

        http_response_code(201);
        echo json_encode(["message" => "Agendamento realizado com sucesso"]);
    }
}