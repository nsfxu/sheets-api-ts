
# Template API Typescript

Esse projeto é uma base para criar uma API simples em Typescript para os meus futuros projetos!

## Estrutura do projeto

```bash
/src
|
|-- /services
|   |-- exampleService.ts
|
|-- /controllers
|   |-- exampleController.ts
|
|-- /routes
|   |-- exampleRoutes.ts            
|
|-- /utils
|   |-- formatDate.ts               # Formata datas para o formato YYYY-MM-DD
|
|-- index.ts
```
## Pré-requisitos
* Node.js (versão 14 ou superior)

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
