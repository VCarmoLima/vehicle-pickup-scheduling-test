<?php

namespace App\Controllers;

use App\Repositories\VeiculoRepository;

class VeiculoController
{
    private VeiculoRepository $repository;

    public function __construct()
    {
        $this->repository = new VeiculoRepository();
    }

    public function show(int $id): void
    {
        $veiculo = $this->repository->findById($id);

        if (!$veiculo) {
            http_response_code(404);
            echo json_encode(["error" => "Veiculo nao encontrado"]);
            return;
        }

        http_response_code(200);
        echo json_encode($veiculo);
    }
}