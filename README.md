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
- **Calendário Horizontal Customizado:** Paginação fluida de dias úteis com navegação por setas, garantindo uma experiência otimizada sem o uso de "pop-ups" nativos.
- **Design:** Refinamento visual da interface ('Pixel Perfect') emulando padrões de design com feedbacks visuais em todas as interações e estados de carregamento do React Query.

## Pré-requisitos e Instalação

- **PHP 8.1+**: [Download](https://windows.php.net/download/)
- **Composer**: [Download](https://getcomposer.org/download/) (Gerenciador de dependências do PHP)
- **Node.js 18+**: [Download](https://nodejs.org/) (Necessário para o ecossistema React/Vite)
- **MySQL 8+**: Gerenciador de banco de dados (Pode ser utilizado via MySQL Installer, XAMPP, Laragon ou Docker).

> **⚠️ Atenção: Configuração do PHP (Windows)**
> Se você estiver configurando o PHP do zero no Windows, é necessário ativar a extensão de conexão com o banco de dados para evitar o **Erro 500** na API:
> 1. Na pasta de instalação do PHP, renomeie o arquivo `php.ini-development` para `php.ini`.
> 2. Abra o arquivo `php.ini` em um editor de texto.
> 3. Procure a linha `;extension_dir = "ext"` e remova o `;` do início.
> 4. Procure a linha `;extension=pdo_mysql` e remova o `;` do início.
> 5. Certifique-se de adicionar o diretório do PHP nas Variáveis de Ambiente (`PATH`) do Windows.

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
3. Abra o arquivo `.env` recém-criado e preencha com as credenciais (usuário e senha) do MySQL da sua máquina local.
4. Rode `composer install` para instalar o roteador e dependências.
5. Inicie o servidor embutido do PHP apontando para a pasta public:
   `php -S localhost:8000 -t public`

## Rodando o Frontend

1. Acesse a pasta `/frontend`.
2. Renomeie o arquivo `.env.example` para `.env` e configure suas credenciais de banco de dados.
3. Rode `npm install` (ou `yarn install`).
4. Rode `npm run dev` (ou `yarn dev`) para iniciar o servidor de desenvolvimento.
