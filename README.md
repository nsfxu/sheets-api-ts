
# Sheets API

Esse projeto é uma base que integra com o Google Sheets para realizar operações de CRUD. Esse projeto utiliza uma conta de serviço da Google para autenticação.

## Estrutura do projeto

```bash
/src
|
|-- /config
|   |-- googleSheetsConfig.ts
|
|-- /controllers
|   |-- sheetsController.ts
|
|-- /routes
|   |-- sheetsRoutes.ts  
|
|-- /services
|   |-- sheetsService.ts          
|
|-- /utils
|   |-- sheetsUtils.ts
|
|   |-- credentials.json
|
|-- index.ts
```

## Pré-requisitos
* Node.js (versão 14 ou superior)
* Conta de serviço do Google configurada com acesso ao Google Sheets
* Credenciais JSON da conta de serviço

## Instalação

- Instale as dependências
```bash
npm install
```

# Uso

Para iniciar o servidor localmente.
```bash
npm run serve
```

A porta está sendo definida no `index.ts`, por padrão é 5000.

## Endpoints
#### Verifica se a API está funcionando

```bash
  GET /ping
```

#### Retorna os dados de uma planilha pelo ID

```bash
  POST /sheets/getAll
```

##### Body


| Nome   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `spreadsheetId` | `string` | **Obrigatório**. O ID da planilha desejada |
| `take` | `string` | **Opcional**. O máximo de itens a ser retornado  |


