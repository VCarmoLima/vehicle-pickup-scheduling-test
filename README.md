# Agendamento de Veículos

API RESTful em PHP e aplicação Frontend em React para agendamento de retirada de veículos.

## Arquitetura

O projeto foi construído utilizando um monorepo, separando claramente as responsabilidades do frontend e do backend.

- **Backend:** PHP puro (sem frameworks). Utiliza padrão arquitetural baseado em Controllers e Repositories, com roteamento através da biblioteca `bramus/router` e acesso a dados via PDO (Prepared Statements).
- **Frontend:** React + TypeScript + Vite. Gerenciamento de estado assíncrono com React Query e construção de interface padronizada com Material UI (MUI).
- **Banco de Dados:** MySQL com restrições de unicidade a nível de banco para garantir a consistência das regras de negócio (prevenção de double-booking).

## Funcionalidades e UX (Frontend)

- **Mobile First:** Interface 100% responsiva baseada em CSS Flexbox e Grid do Material UI.
- **Wizard Interativo (SPA):** Navegação fluida em três etapas (Calendário -> Formulário -> Sucesso) sem recarregar a página.
- **Defesa em Profundidade (Validação):** Validação de E-mail via Regex e máscara de Telefone dinâmica (fixo/celular) em tempo real.
- **Regras de Negócio na UI:** Bloqueio de datas retroativas, finais de semana e limite de agendamento de 30 dias diretamente no calendário visual.

## Pré-requisitos

- PHP 8.1+
- Composer
- Node.js 18+
- MySQL 8+

## Configuração do Banco de Dados

1. Acesse o seu gerenciador MySQL (ex: MySQL Workbench).
2. Execute o script contido em `database/schema.sql` para criar o banco `agendamentos_db`, as tabelas necessárias e inserir o veículo de teste inicial.

## Documentação da API (Endpoints)

A API roda por padrão na porta 8000. 

### `GET /api/veiculo/{id}`
Retorna os dados estáticos de um veículo específico.

### `GET /api/disponibilidade?data=YYYY-MM-DD`
Retorna os horários disponíveis para agendamento em uma data específica, subtraindo os horários já agendados no banco de dados.

### `POST /api/agendamentos`
Recebe os dados do usuário e do agendamento, validando duplicidade.
**Payload esperado (JSON):**
```json
{
  "veiculo_id": 1,
  "nome": "Nome do Cliente",
  "email": "cliente@email.com",
  "telefone": "11999999999",
  "data_hora": "2026-03-22 10:00:00"
}
```

## Rodando o Backend

1. Acesse a pasta `/backend`.
2. Renomeie o arquivo `.env.example` para `.env` e configure suas credenciais de banco de dados.
3. Rode `composer install` para instalar o roteador e dependências.
4. Inicie o servidor embutido do PHP apontando para a pasta public:
   `php -S localhost:8000 -t public`

## Rodando o Frontend

1. Acesse a pasta `/frontend`.
2. Crie um arquivo `.env` na raiz do frontend com a URL da API:
   `VITE_API_URL=http://localhost:8000/api`
3. Rode `npm install` (ou `yarn install`).
4. Rode `npm run dev` (ou `yarn dev`) para iniciar o servidor de desenvolvimento.
