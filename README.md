# LifeOS 🧠

Um sistema completo de Gestão Pessoal para acompanhamento de Tarefas, Finanças e Hábitos Diários, desenvolvido com Next.js e focado em alta performance e experiência do usuário (UX).

## 🚀 Funcionalidades

- **Autenticação Segura**: Login e Cadastro gerenciados pelo Supabase Auth.
- **Arquitetura Multi-tenant**: Isolamento total de dados. Cada usuário tem acesso apenas às suas próprias informações.
- **Dashboard Integrado**: Visão geral de saldo financeiro, tarefas pendentes e progresso de hábitos diários.
- **Gestão de Tarefas**: Criação, conclusão e exclusão de tarefas organizadas por projetos.
- **Controle Financeiro**: Registro de entradas/saídas e cálculo em tempo real do saldo total.
- **Tracker de Hábitos**: Acompanhamento de hábitos com reset automático diário.
- **UX Inteligente**: Botões com estado de carregamento e confirmação de exclusão para prevenir erros do usuário.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router) e React
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) + Componentes [shadcn/ui](https://ui.shadcn.com/)
- **Banco de Dados**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Autenticação**: [Supabase](https://supabase.com/)
- **Server State**: Next.js Server Actions (sem necessidade de APIs REST intermediárias)

## ⚙️ Como rodar o projeto localmente

**1. Clone o repositório**
```bash
git clone [https://github.com/seu-usuario/lifeos.git](https://github.com/seu-usuario/lifeos.git)
cd lifeos