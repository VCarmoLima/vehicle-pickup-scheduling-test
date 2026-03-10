# Agendamento de Veículos

API RESTful em PHP e aplicação Frontend em React para agendamento de visitas a veículos.

## Arquitetura

O projeto foi construído utilizando um monorepo, separando claramente as responsabilidades do frontend e do backend.

- **Backend:** PHP puro (sem frameworks). Utiliza padrão arquitetural baseado em Controllers e Repositories, com roteamento através da biblioteca `bramus/router` e acesso a dados via PDO (Prepared Statements).
- **Frontend:** React + TypeScript + Vite. Gerenciamento de estado assíncrono com React Query e construção de interface padronizada com Material UI (MUI).
- **Banco de Dados:** MySQL com restrições de unicidade a nível de banco para garantir a consistência das regras de negócio (prevenção de double-booking).

## Pré-requisitos

- PHP 8.1+
- Composer
- Node.js 18+
- MySQL 8+

## Configuração do Banco de Dados

1. Execute o script contido na raiz do projeto (ou cole a query de criação fornecida) para criar o banco `agendamentos_db` e as tabelas necessárias.
2. O script já insere um veículo de teste no banco.

## Rodando o Backend

1. Acesse a pasta `/backend`.
2. Renomeie o arquivo `.env.example` para `.env` e configure suas credenciais de banco de dados.
3. Rode `composer install` para instalar o roteador e dependências.
4. Inicie o servidor embutido do PHP apontando para a pasta public:
   `php -S localhost:8000 -t public`

## Rodando o Frontend

1. Acesse a pasta `/frontend`.
2. Rode `npm install` ou `yarn install`.
3. Rode `npm run dev` ou `yarn dev` para iniciar o servidor de desenvolvimento.