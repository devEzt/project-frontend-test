# Gerenciador de Usuários

![Gerenciador de Usuários](./public/avatars/user-avatar1.jpg)

Este projeto foi desenvolvido como um sistema completo de gerenciamento de usuários, oferecendo uma interface moderna e responsiva para administrar perfis de usuários.

## Visão Geral

O Gerenciador de Usuários é uma aplicação web que permite o cadastro, visualização, edição e exclusão de usuários em diferentes filiais. A interface intuitiva e o design moderno garantem uma experiência de usuário agradável e eficiente.

## Demo

A aplicação está hospedada no Vercel e você pode vê-la em ação [aqui](https://project-frontend-test.vercel.app/usuarios).

## Tecnologias Utilizadas

- **Next.js**: Framework React que oferece renderização híbrida, otimização de imagens e roteamento simplificado.
- **TypeScript**: Adiciona tipagem estática ao JavaScript, aumentando a segurança e a manutenibilidade do código.
- **Tailwind CSS**: Framework CSS utilitário que permite criar designs personalizados rapidamente sem sair do seu HTML.
- **Shadcn/UI**: Biblioteca de componentes acessíveis e reutilizáveis construídos com Radix UI e Tailwind CSS.
- **Lucide Icons**: Conjunto de ícones SVG limpos e consistentes para a interface do usuário.
- **React Hook Form**: Biblioteca para gerenciar formulários com facilidade e eficiência.
- **Radix UI**: Conjunto de componentes primitivos acessíveis e de baixo nível para construir interfaces de usuário.

## Principais Recursos

- Dashboard com estatísticas de usuários
- Gerenciamento de múltiplas filiais
- Listagem de usuários com paginação
- Formulários de cadastro e edição com validação
- Interface responsiva (desktop e móvel)
- Avatares personalizados para usuários
- Sistema de notificações

## Como Rodar o Projeto

### Instalação

Clone o repositório e instale as dependências.

```bash
git clone https://github.com/SeuUser/gerenciador-usuarios.git
```

```bash
cd gerenciador-usuarios
```

```bash
npm install
```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento.

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

### Produção

Para criar uma build de produção.

```bash
npm run build
```

Para iniciar a versão de produção:

```bash
npm run start
```

## Estrutura do Projeto

O projeto segue uma arquitetura bem organizada para facilitar a manutenção:

- `/app`: Páginas e rotas da aplicação usando o App Router do Next.js
- `/components`: Componentes reutilizáveis da interface
- `/components/ui`: Componentes base do Shadcn UI
- `/lib`: Utilitários e funções auxiliares
- `/data`: Dados e serviços para a aplicação
- `/public`: Arquivos estáticos, incluindo avatares de usuários

## Licença

MIT

---

Feito por Alexandre Maciel www.github.com/devezt.
