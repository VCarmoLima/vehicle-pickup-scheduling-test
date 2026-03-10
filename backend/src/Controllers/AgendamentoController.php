<?php

namespace App\Controllers;

use App\Repositories\AgendamentoRepository;

class AgendamentoController
{
    private AgendamentoRepository $repository;

    public function __construct()
    {
        $this->repository = new AgendamentoRepository();
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
}