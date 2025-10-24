# Desafio Frontend - Fluxo de Checkout | Colmeia.io

![Status: Concluído](https://img.shields.io/badge/status-concluído-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> Projeto desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Frontend na Colmeia.io.

### 🔗 Link para o Deploy
**Acesse a aplicação em produção:** [https://colmeiachallenge.vercel.app/](https://colmeiachallenge.vercel.app/)

---

### Demonstração em Vídeo

Um rápido tour pelo fluxo completo da aplicação, desde a seleção de produtos até a finalização do pagamento com validação em tempo real.

![Demonstração do Projeto](https://i.imgur.com/HnbF23c.gif)

---

## Sobre o Projeto

Este projeto consiste na construção de uma interface de e-commerce **100% mockada** (sem backend real), focada na experiência do usuário durante o fluxo de checkout. A aplicação foi desenvolvida seguindo os requisitos propostos, com atenção especial à qualidade do código, componentização, responsividade e fidelidade na simulação dos processos de pagamento.

A identidade visual foi inspirada na própria **Colmeia.io**, utilizando sua paleta de cores e logo para demonstrar atenção aos detalhes e senso de produto.

---

## ✅ Funcionalidades Implementadas

### Funcionalidades Essenciais
- **Catálogo de Produtos:** Listagem de produtos com informações básicas.
- **Gerenciamento de Carrinho:**
  - Adição de itens ao carrinho.
  - Ajuste de quantidade (aumentar/diminuir) e remoção de itens.
  - O estado do carrinho é global e atualizado em tempo real no Header, na página do carrinho e no resumo do pedido.
- **Autenticação Mockada:** Simulação de login/cadastro com persistência de sessão no `localStorage` do navegador.
- **Rotas Protegidas:** Acesso à página de checkout restrito a usuários autenticados.
- **Fluxo de Pagamento Completo:**
  - Seleção de método de pagamento (Cartão de Crédito, Pix, Boleto) usando abas.
  - Geração dinâmica de um **QR Code** para a simulação de pagamento via Pix.
  - Simulação de processamento com feedback de sucesso ou falha aleatória.
  - Redirecionamento para página de status do pedido.

### Refinamentos de UI/UX
- **Design Responsivo:** Layout adaptável para desktop e mobile, com um grid inteligente na página de checkout.
- **Validação de Formulário Avançada:**
  - Validação em tempo real (`onBlur`) e na submissão (`onSubmit`) para o formulário de cartão de crédito.
  - Mensagens de erro claras e em português.
  - Implementado com `React Hook Form` e `Zod`.
- **Máscaras de Input:** Formatação automática para os campos de Número do Cartão, Validade e CVV, melhorando a usabilidade.
- **Componentes de UI "Apple-like":** Inputs com o efeito de *floating label* para uma interface mais limpa e moderna.
- **Redirecionamento Inteligente:** Se o carrinho for esvaziado na página de checkout, o usuário é automaticamente redirecionado para a página de carrinho vazio.

---

## Tecnologias Utilizadas

O projeto foi construído com uma stack moderna, focada em performance e na melhor experiência de desenvolvimento:

- **React**
- **Next.js 13+ (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI** para a base de componentes (Abas, Inputs, Botões).
- **React Hook Form** para gerenciamento de formulários.
- **Zod** para validação de schemas.
- **`@react-input/mask`** para a formatação de inputs.
- **`qrcode.react`** para a geração de QR Codes.
- **Context API** para gerenciamento de estado global (Carrinho e Autenticação).

---

## Rodando o Projeto Localmente

Siga os passos abaixo para executar o projeto em sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/kauannkelvinn/desafio-frontend](https://github.com/kauannkelvinn/desafio-frontend)
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd desafio-frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## Autor

**Kauan Kelvin**

- [LinkedIn](https://www.linkedin.com/in/kauannkelvinn/)
- [GitHub](https://github.com/kauannkelvinn)
