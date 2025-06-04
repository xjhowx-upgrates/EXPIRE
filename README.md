# EXPIRE

![EXPIRE Logo](https://via.placeholder.com/200x60?text=EXPIRE)

## 📝 Descrição

EXPIRE é uma plataforma inovadora que reimagina o conceito de jogos de slots, onde você aposta minutos do seu tempo, não dinheiro. O conceito principal é criar uma experiência divertida e sem riscos financeiros, mantendo a emoção dos jogos tradicionais.

Desenvolvido com React, TypeScript e Firebase, EXPIRE oferece uma interface moderna, responsiva e intuitiva para proporcionar a melhor experiência ao usuário.

## ✨ Funcionalidades

- **Sistema de Jogos Baseado em Tempo**: Apostas utilizando minutos ao invés de dinheiro
- **Variedade de Jogos**: Diversos jogos inspirados na linha Fortune Tiger
- **Sistema de Ranking**: Competição saudável entre jogadores
- **Conquistas**: Desbloqueie conquistas especiais à medida que joga
- **Perfil Personalizado**: Acompanhe seu progresso e estatísticas
- **Design Responsivo**: Experiência perfeita em desktop e dispositivos móveis

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/) (Autenticação, Firestore)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/xjhowx/EXPIRE.git
cd EXPIRE
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Adicione um aplicativo web ao seu projeto
   - Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais:
```
VITE_FIREBASE_API_KEY=seu-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-auth-domain
VITE_FIREBASE_PROJECT_ID=seu-project-id
VITE_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-messaging-sender-id
VITE_FIREBASE_APP_ID=seu-app-id
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse `http://localhost:5173` no seu navegador

## 📁 Estrutura do Projeto

```
EXPIRE/
├── public/             # Arquivos públicos
├── src/                # Código fonte
│   ├── components/     # Componentes React
│   │   ├── navigation/ # Componentes de navegação (Navbar, Sidebar, Footer)
│   │   └── ui/         # Componentes de interface
│   ├── contexts/       # Contextos React (Auth, Game)
│   ├── data/           # Dados estáticos (slotGames)
│   ├── firebase/       # Configuração e utilitários do Firebase
│   ├── hooks/          # Hooks personalizados
│   ├── layouts/        # Layouts da aplicação
│   ├── pages/          # Páginas da aplicação
│   ├── types/          # Definições de tipos TypeScript
│   └── utils/          # Funções utilitárias
├── .env                # Variáveis de ambiente
├── vercel.json         # Configuração do Vercel
└── vite.config.ts      # Configuração do Vite
```

## 🎮 Como Jogar

1. Crie uma conta ou faça login
2. Navegue até a página de jogos
3. Escolha um jogo entre as opções disponíveis
4. Selecione quanto tempo deseja apostar (entre os limites do jogo)
5. Divirta-se e acompanhe seus resultados!

## 📱 Deploy

A aplicação está configurada para deploy no Vercel. Basta conectar seu repositório ao Vercel e o deploy será automático a cada push para a branch principal.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**xjhowx** - [GitHub](https://github.com/xjhowx)

---

Desenvolvido com ❤️ por xjhowx.
