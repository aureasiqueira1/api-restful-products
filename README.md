# Sistema de Gerenciamento de Pedidos e Produtos 🚀

## Descrição 📝

Este projeto implementa uma API para o gerenciamento de **pedidos** e **produtos**, utilizando **Node.js** com **NestJS** e **PostgreSQL**. O código segue boas práticas de organização, separando as responsabilidades em **controllers**, **services**, **entities**, e **DTOs**. A API também está documentada com **Swagger**, permitindo fácil acesso aos endpoints e à documentação da API.

---
## Funcionalidades 💼

### 1. **Produtos** 📦
- **Criar**: Adiciona um novo produto ao sistema.
- **Listar**: Retorna todos os produtos cadastrados.
- **Editar**: Atualiza os detalhes de um produto existente.
- **Deletar**: Remove um produto do sistema.
  

### 2. **Pedidos** 📑
- **Criar**: Cria um novo pedido, verificando a quantidade de estoque dos produtos.
- **Listar**: Retorna todos os pedidos realizados.

Ao criar um pedido:
  - Verifica se a quantidade de cada produto está disponível no estoque.
  - Atualiza o estoque caso o pedido seja concluído.

---
## Tecnologias Usadas ⚙️

- **Node.js**
- **NestJS**
- **PostgreSQL** (banco de dados relacional)
- **Swagger** para documentação da API
- **Jest** para testes unitários
- **TypeORM** para integração com o banco de dados

## Instalação 🛠️

### 1. Clonar o Repositório

Clone o repositório do projeto em sua máquina:

```
git clone https://github.com/aureasiqueira1/api-restful-products.git
cd api-restful-products
```

### 2. Instalar Dependências

```
npm install
```

### 3. Configurar Banco de Dados
Crie um banco de dados PostgreSQL em sua máquina ou utilize um serviço de banco de dados na nuvem (como Heroku ou ElephantSQL).

### 4. Executar a Aplicação
Após a instalação das dependências e configuração do banco, execute o servidor:

```
npm run start
```
---

## Testes Unitários 🧪
O projeto utiliza Jest para testes unitários. Para rodá-los, execute o seguinte comando:

```
npm run test
```
---

## Documentação da API 📚

A documentação da API pode ser acessada através do Swagger na seguinte URL após rodar a aplicação:

```
http://localhost:3000/api
```
