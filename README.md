# 🎮 EXPIRE - Plataforma de Jogos Online

![EXPIRE Logo](https://via.placeholder.com/800x200/8B5CF6/FFFFFF?text=EXPIRE+-+Gaming+Platform)

## 📋 Sobre o Projeto

**EXPIRE** é uma plataforma inovadora de jogos online onde o **tempo é a moeda principal**. Desenvolvida com tecnologias modernas, oferece uma experiência única onde os jogadores gerenciam seu tempo como recurso estratégico para jogar, conquistar achievements e dominar o ranking global.

### 🎯 Características Principais

- ⏰ **Sistema de Tempo Único**: Tempo como moeda virtual
- 🎮 **6 Jogos Funcionais**: Slot Machine, Crash Game, Roleta, Sweet Bonanza, Campo Minado e Blackjack
- 🏆 **Sistema de Conquistas**: 8 conquistas em 4 raridades diferentes
- 👑 **Ranking Global**: Competição em tempo real
- 🌗 **Tema Escuro/Claro**: Interface adaptável
- 📱 **Design Responsivo**: Funciona em todos os dispositivos

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Zustand** - Gerenciamento de estado
- **React Router** - Navegação
- **React Hot Toast** - Notificações

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Banco de dados
- **Row Level Security (RLS)** - Segurança
- **Real-time subscriptions** - Atualizações em tempo real

### Ferramentas de Desenvolvimento
- **Vite** - Build tool
- **ESLint** - Linting
- **PostCSS** - Processamento CSS
- **Autoprefixer** - Compatibilidade CSS

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### 1. Clone o repositório
```bash
git clone https://github.com/xjhowx/expire-gaming-platform.git
cd expire-gaming-platform
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do Supabase:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Configure o banco de dados
Execute o script SQL em `supabase/migrations/create_complete_schema.sql` no seu projeto Supabase.

### 5. Execute o projeto
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🎮 Jogos Disponíveis

### 1. 🎰 Slot Machine (3 min)
- Caça-níqueis clássico com 5 rolos
- Múltiplas linhas de pagamento
- Símbolos especiais e multiplicadores

### 2. 🚀 Crash Game (4 min)
- Multiplicador crescente em tempo real
- Sistema de cash-out estratégico
- Histórico de crashes

### 3. 🎯 Roleta Europeia (5 min)
- Roleta clássica com 37 números
- Apostas múltiplas (cores, números, par/ímpar)
- Animações realistas

### 4. 🍭 Sweet Bonanza (4 min) - *Em breve*
- Slot temático de doces
- Grid 5x6 com símbolos em cascata
- Multiplicadores especiais

### 5. 💣 Campo Minado (6 min) - *Em breve*
- Jogo clássico de campo minado
- Multiplicadores progressivos
- Sistema de risco vs recompensa

### 6. 🃏 Blackjack (5 min) - *Em breve*
- Jogo de cartas contra a casa
- Regras tradicionais
- Estratégia e sorte

## 🏆 Sistema de Conquistas

| Conquista | Raridade | Pontos | Condição |
|-----------|----------|--------|----------|
| Primeiro Jogo | Comum | 10 | Jogar 1 jogo |
| Iniciante | Comum | 25 | Jogar 5 jogos |
| Jogador Experiente | Raro | 100 | Jogar 25 jogos |
| Sortudo | Raro | 150 | Ganhar 10 jogos |
| Veterano | Épico | 250 | Jogar 50 jogos |
| Jackpot | Épico | 500 | Ganhar 25 jogos |
| Mestre dos Jogos | Lendário | 750 | Jogar 100 jogos |
| Lenda | Lendário | 1000 | Ganhar 50 jogos |

## ⏰ Sistema de Tempo

- **Tempo Inicial**: 120 minutos (2 horas)
- **Bônus Automático**: +10 minutos a cada hora
- **Limite Máximo**: 480 minutos (8 horas)
- **Custo por Jogo**: 3-6 minutos dependendo do jogo

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── games/          # Componentes dos jogos
│   ├── layout/         # Layout (Navbar, Footer)
│   └── ui/             # Componentes de interface
├── pages/              # Páginas da aplicação
├── stores/             # Gerenciamento de estado (Zustand)
├── lib/                # Configurações e utilitários
└── App.tsx             # Componente principal

supabase/
└── migrations/         # Scripts SQL do banco
```

## 🔒 Segurança

- **Row Level Security (RLS)** habilitado em todas as tabelas
- **Políticas de segurança** específicas para cada operação
- **Autenticação segura** via Supabase Auth
- **Validação de dados** no frontend e backend

## 📊 Banco de Dados

### Tabelas Principais
- `profiles` - Perfis dos usuários
- `time_tracking` - Controle de tempo
- `game_sessions` - Sessões de jogos
- `achievements` - Conquistas disponíveis
- `user_achievements` - Conquistas dos usuários
- `leaderboard` - Ranking global

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Netlify
1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente
3. Build command: `npm run build`
4. Publish directory: `dist`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Jonathan S. (@xjhowx)**
- GitHub: [@xjhowx](https://github.com/xjhowx)
- Email: contato@expire.com

## 🙏 Agradecimentos

- [Supabase](https://supabase.com) - Backend as a Service
- [Vercel](https://vercel.com) - Hospedagem
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Lucide React](https://lucide.dev) - Ícones
- [Framer Motion](https://www.framer.com/motion/) - Animações

---

<div align="center">
  <p>Desenvolvido com ❤️ por Jonathan S. (@xjhowx)</p>
  <p>© 2025 EXPIRE. Todos os direitos reservados.</p>
</div>