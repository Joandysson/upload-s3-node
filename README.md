## Upload de arquivos com node

- Informações do projeto

- - -
## Sobre ##
### Objetivo
Desenvolver um Back-and que disponibilize uma API para realizar uploads de imagens, cujo Postman esta compartilhado neste repositório (collection) - Upload Node.postman_collection.

### Projeto

Segue as versões utilizadas no construção do projeto

Ferramenta | Versão
-----------|-------
npm        | 7.5.4
node       | 15.8.0
yarn       | 1.22.5

O Projeto foi construido na porta `3333`, ou seja para Efetuar requisições é só ir em `localhot:3333` após iniciar o projeto

- Pré-Requisitos

Para conseguir rodar o projeto é preciso ter o npm e node estaladno na  maquina



## Como iniciar

* Na raiz do projeto tem um aquivo chamado `.env.exemple` com todas as configurações e credenciais que foram utilizadas no projeto, apenas o renomei para `.env`

```bash
# Clone o repositório
$ git clone git@github.com:Joandysson/upload-s3-node.git

# Acesse a pasta
$ cd upload-s3-node.git


# Para instalar todas as dependencias do projeto
$ yarn

# Para iniciar o servidor do projeto
$ yarn dev

```

## API

-  Foi utilizado um prefixo `api/v1` para todas as rotas

|Métodos| Parâmetros | Descrição |
|---|---|---|
|`GET`| `image/uploads` | Retorna um JSON com todos os Uploads realizados. |
|`POST`| `image/upload` | Efetua o upload de uma imagem. |
|`DELETE`| `image/upload/{id}` | Deleta a imagem baseado no `ID` informado. |

### Todos os Uploads [GET][/image/uploads]
+ Response 200 (application/json)
  Todos as Imagens

    + Body

            [
                {
                    "id": "6061c3ec2fe4032680d6064f",
                    "name": "Untitled.png",
                    "type": "",
                    "filename": "1617019884120-Untitled.png",
                    "size": 192142,
                    "url": "http://localhost:3333/files/1617019884120-Untitled.png",
                    "createdAt": "2021-03-29T12:11:24.137Z"
                },
                {
                    "id": "6061c46ef5f72a29dc026b61",
                    "name": "wp4676574-4k-pc-wallpapers.jpg",
                    "type": "Paisagem",
                    "filename": "1d38b378b039014294819b2dec0c620c-wp4676574-4k-pc-wallpapers.jpg",
                    "size": 1704772,
                    "url": "https://upload-node-application.s3.amazonaws.com/1d38b378b039014294819b2dec0c620c-wp4676574-4k-pc-wallpapers.jpg",
                    "createdAt": "2021-03-29T12:13:34.821Z"
                }
            ]


+ Response 200 (application/json)
    + Quando nenhum dado for encontado

            []


### Cadastrar imagem [POST][/image/upload]
+ Response 201 (form-data)
  Cadastrar uma imagem

    + Header

            Content-Type: multipart/form-data;

    + Body

            image: file


+ Response 201 (application/json)
  Cadastrar uma imagem
    + Body

            {
                "id": "6061c46ef5f72a29dc026b61",
                "name": "wp4676574-4k-pc-wallpapers.jpg",
                "type": "Paisagem",
                "filename": "1d38b378b039014294819b2dec0c620c-wp4676574-4k-pc-wallpapers.jpg",
                "size": 1704772,
                "url": "https://upload-node-application.s3.amazonaws.com/1d38b378b039014294819b2dec0c620c-wp4676574-4k-pc-wallpapers.jpg",
                "createdAt": "2021-03-29T12:13:34.821Z"
            }

### Deletar imagem [DELETE][/image/upload/{ID}]
+ Response 200 (application/json)
  Deletar uma imagem
    + Body

            -

+ Response 401 (application/json)
  Imagem não encontrada
    + Body

            "image not found"

> By Joandysson Gama