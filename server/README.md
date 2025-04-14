## Environment Setup

The project uses different environment files:

- `.env`: Development environment (not committed)
- `.env.example`: Template for development environment
- `.env.test`: Test environment configuration

## Naming pattern

| Operation  | Repository | Service   | Route     |
| ---------- | ---------- | --------- | --------- |
| Create     | `insert`   | `create`  | `store`   |
| Read (All) | `findAll`  | `list`    | `index`   |
| Read (One) | `findById` | `getById` | `show`    |
| Update     | `update`   | `update`  | `update`  |
| Delete     | `delete`   | `delete`  | `destroy` |

## Roadmap

- [x]  Deve ser possível criar um link
    - [x]  Não deve ser possível criar um link com URL encurtada já existente
    - []  Não deve ser possível criar um link com URL encurtada mal formatada
- [x]  Deve ser possível listar todas as URL’s cadastradas
- [ ]  Deve ser possível deletar um link
- [ ]  Deve ser possível obter a URL original por meio de uma URL encurtada
- [ ]  Deve ser possível incrementar a quantidade de acessos de um link
- [ ]  Deve ser possível exportar os links criados em um CSV
    - [ ]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
    - [ ]  Deve ser gerado um nome aleatório e único para o arquivo
    - [ ]  Deve ser possível realizar a listagem de forma performática
    - [ ]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.
