// Admin mock data

export const ADMIN_NAV = [
  { id: "visao-geral", label: "Visão Geral", icon: "LayoutDashboard" },
  { id: "clientes", label: "Clientes", icon: "Users", badge: 3 },
  { id: "producao", label: "Produção", icon: "Kanban", badge: 5 },
  { id: "colaboradores", label: "Colaboradores", icon: "UserCog" },
  { id: "financeiro", label: "Financeiro", icon: "CreditCard" },
  { id: "produtos", label: "Produtos / Planos", icon: "Package" },
  { id: "comercial", label: "Comercial", icon: "TrendingUp", badge: 2 },
  { id: "alertas", label: "Alertas", icon: "AlertTriangle", badge: 4 },
  { id: "relatorios", label: "Relatórios", icon: "FileText" },
  { id: "config", label: "Configurações", icon: "Settings" },
];

export const METRIC_CARDS = [
  { label: "MRR", value: "R$ 87.450", change: 12.3, trend: "up" as const },
  { label: "Clientes Ativos", value: "142", change: 8.1, trend: "up" as const },
  { label: "Ticket Médio", value: "R$ 615", change: 3.2, trend: "up" as const },
  { label: "Churn Rate", value: "2.1%", change: -0.5, trend: "down" as const },
  { label: "Receita a Receber", value: "R$ 32.800", change: 5.4, trend: "up" as const },
  { label: "Valores Vencidos", value: "R$ 4.200", change: 15.0, trend: "up" as const },
  { label: "Colaboradores Ativos", value: "18", change: 0, trend: "neutral" as const },
  { label: "ARR Projetado", value: "R$ 1.049.400", change: 12.3, trend: "up" as const },
];

export const MRR_CHART_DATA = [
  { month: "Jan", value: 62000 },
  { month: "Fev", value: 65000 },
  { month: "Mar", value: 68500 },
  { month: "Abr", value: 71200 },
  { month: "Mai", value: 74800 },
  { month: "Jun", value: 78100 },
  { month: "Jul", value: 80500 },
  { month: "Ago", value: 82300 },
  { month: "Set", value: 84000 },
  { month: "Out", value: 85700 },
  { month: "Nov", value: 86200 },
  { month: "Dez", value: 87450 },
];

export const PLAN_DISTRIBUTION = [
  { name: "Starter", value: 38, color: "hsl(var(--blue))" },
  { name: "Growth", value: 52, color: "hsl(var(--green))" },
  { name: "Pro", value: 35, color: "hsl(var(--purple))" },
  { name: "Scale", value: 17, color: "hsl(var(--amber))" },
];

export const CLIENT_STATUS = [
  { name: "Ativos", value: 128, color: "hsl(var(--green))" },
  { name: "Pausados", value: 8, color: "hsl(var(--amber))" },
  { name: "Inadimplentes", value: 6, color: "hsl(var(--red))" },
];

export const MOCK_CLIENTS = [
  { id: "1", name: "Ricardo Mendes", empresa: "TechVision Ltda.", email: "ricardo@techvision.com", telefone: "(11) 99999-0001", plano: "Pro", valor: 1200, inicio: "2024-03-15", status: "ativo" },
  { id: "2", name: "Ana Paula Costa", empresa: "Studio Design Co.", email: "ana@studiodesign.com", telefone: "(21) 98888-0002", plano: "Growth", valor: 800, inicio: "2024-05-01", status: "ativo" },
  { id: "3", name: "Carlos Silva", empresa: "Inova Digital", email: "carlos@inovadigital.com", telefone: "(31) 97777-0003", plano: "Scale", valor: 2500, inicio: "2023-11-10", status: "ativo" },
  { id: "4", name: "Mariana Santos", empresa: "MKT Express", email: "mariana@mktexpress.com", telefone: "(41) 96666-0004", plano: "Starter", valor: 400, inicio: "2024-08-20", status: "pausado" },
  { id: "5", name: "João Pedro Lima", empresa: "JP Consultoria", email: "joao@jpconsultoria.com", telefone: "(51) 95555-0005", plano: "Growth", valor: 800, inicio: "2024-01-05", status: "inadimplente" },
  { id: "6", name: "Fernanda Oliveira", empresa: "FO Arquitetura", email: "fernanda@foarq.com", telefone: "(61) 94444-0006", plano: "Pro", valor: 1200, inicio: "2024-06-12", status: "ativo" },
  { id: "7", name: "Bruno Almeida", empresa: "BA Tech Solutions", email: "bruno@batech.com", telefone: "(71) 93333-0007", plano: "Starter", valor: 400, inicio: "2024-09-01", status: "ativo" },
  { id: "8", name: "Camila Rocha", empresa: "Rocha & Filhos", email: "camila@rochafilhos.com", telefone: "(81) 92222-0008", plano: "Growth", valor: 800, inicio: "2024-02-14", status: "ativo" },
];

export const FUNCOES_COLABORADOR = ["Gestor", "Designer", "Tráfego"] as const;
export type FuncaoColaborador = typeof FUNCOES_COLABORADOR[number];

export const MOCK_COLABORADORES = [
  { id: "1", name: "Lucas Ferreira", cargo: "Designer Senior", funcao: "Designer" as FuncaoColaborador, email: "lucas@united.com", status: "ativo", tarefas: 8, projetos: 5 },
  { id: "2", name: "Juliana Martins", cargo: "Gestora de Projetos", funcao: "Gestor" as FuncaoColaborador, email: "juliana@united.com", status: "ativo", tarefas: 12, projetos: 4 },
  { id: "3", name: "Rafael Costa", cargo: "Gestor de Tráfego", funcao: "Tráfego" as FuncaoColaborador, email: "rafael@united.com", status: "ativo", tarefas: 6, projetos: 7 },
  { id: "4", name: "Patrícia Lima", cargo: "Social Media Designer", funcao: "Designer" as FuncaoColaborador, email: "patricia@united.com", status: "ativo", tarefas: 15, projetos: 8 },
  { id: "5", name: "Diego Santos", cargo: "Motion Designer", funcao: "Designer" as FuncaoColaborador, email: "diego@united.com", status: "férias", tarefas: 0, projetos: 3 },
  { id: "6", name: "Amanda Souza", cargo: "Analista de Tráfego", funcao: "Tráfego" as FuncaoColaborador, email: "amanda@united.com", status: "ativo", tarefas: 10, projetos: 6 },
];

export const MOCK_KANBAN_ADMIN = [
  { id: "col-1", title: "Solicitações", cards: [
    { id: "t1", title: "Landing Page - Campanha Black Friday", cliente: "TechVision Ltda.", responsavel: "Lucas Ferreira", prioridade: "alta", prazo: "2024-12-10", tipo: "Landing Page", comentarios: 3, anexos: 2 },
    { id: "t2", title: "Criativo Instagram - Lançamento", cliente: "Studio Design Co.", responsavel: "Patrícia Lima", prioridade: "media", prazo: "2024-12-15", tipo: "Criativo", comentarios: 1, anexos: 0 },
  ]},
  { id: "col-2", title: "Pendentes", cards: [
    { id: "t3", title: "Automação Email Marketing", cliente: "Inova Digital", responsavel: "Juliana Martins", prioridade: "alta", prazo: "2024-12-08", tipo: "Automação", comentarios: 5, anexos: 3 },
  ]},
  { id: "col-3", title: "Em Produção", cards: [
    { id: "t4", title: "Campanha Google Ads Q4", cliente: "MKT Express", responsavel: "Rafael Costa", prioridade: "alta", prazo: "2024-12-12", tipo: "Campanha", comentarios: 8, anexos: 1 },
    { id: "t5", title: "Vídeo Institucional", cliente: "JP Consultoria", responsavel: "Diego Santos", prioridade: "media", prazo: "2024-12-20", tipo: "Vídeo", comentarios: 2, anexos: 4 },
    { id: "t6", title: "Funil de Vendas Completo", cliente: "FO Arquitetura", responsavel: "Juliana Martins", prioridade: "baixa", prazo: "2025-01-05", tipo: "Funil", comentarios: 0, anexos: 0 },
  ]},
  { id: "col-4", title: "Em Revisão", cards: [
    { id: "t7", title: "Estratégia Q1 2025", cliente: "BA Tech Solutions", responsavel: "Amanda Souza", prioridade: "media", prazo: "2024-12-18", tipo: "Estratégia", comentarios: 4, anexos: 2 },
  ]},
  { id: "col-5", title: "Concluído", cards: [
    { id: "t8", title: "Relatório Mensal Nov/24", cliente: "Rocha & Filhos", responsavel: "Amanda Souza", prioridade: "baixa", prazo: "2024-12-01", tipo: "Relatório", comentarios: 2, anexos: 1 },
  ]},
];

export const MOCK_FINANCEIRO = [
  { id: "1", cliente: "TechVision Ltda.", valor: 1200, vencimento: "2024-12-15", status: "pendente" },
  { id: "2", cliente: "Studio Design Co.", valor: 800, vencimento: "2024-12-10", status: "pago" },
  { id: "3", cliente: "Inova Digital", valor: 2500, vencimento: "2024-12-05", status: "pago" },
  { id: "4", cliente: "MKT Express", valor: 400, vencimento: "2024-11-30", status: "vencido" },
  { id: "5", cliente: "JP Consultoria", valor: 800, vencimento: "2024-11-25", status: "vencido" },
  { id: "6", cliente: "FO Arquitetura", valor: 1200, vencimento: "2024-12-20", status: "pendente" },
  { id: "7", cliente: "BA Tech Solutions", valor: 400, vencimento: "2024-12-15", status: "pendente" },
  { id: "8", cliente: "Rocha & Filhos", valor: 800, vencimento: "2024-12-10", status: "pago" },
];

export const FATURAMENTO_MENSAL = [
  { month: "Jan", faturado: 58000, recebido: 55000 },
  { month: "Fev", faturado: 62000, recebido: 59000 },
  { month: "Mar", faturado: 65000, recebido: 63000 },
  { month: "Abr", faturado: 68000, recebido: 65500 },
  { month: "Mai", faturado: 72000, recebido: 70000 },
  { month: "Jun", faturado: 75000, recebido: 73000 },
  { month: "Jul", faturado: 78000, recebido: 76500 },
  { month: "Ago", faturado: 80000, recebido: 78000 },
  { month: "Set", faturado: 82000, recebido: 80500 },
  { month: "Out", faturado: 84000, recebido: 82000 },
  { month: "Nov", faturado: 85500, recebido: 83000 },
  { month: "Dez", faturado: 87450, recebido: 84200 },
];

export const MOCK_FUNIL = [
  { id: "1", empresa: "Nova Startup", valor: 3500, responsavel: "Amanda Souza", probabilidade: 80, etapa: "Negociação" },
  { id: "2", empresa: "Global Services", valor: 5000, responsavel: "Rafael Costa", probabilidade: 60, etapa: "Proposta" },
  { id: "3", empresa: "Tech Masters", valor: 1200, responsavel: "Amanda Souza", probabilidade: 90, etapa: "Fechado" },
  { id: "4", empresa: "Digital One", valor: 800, responsavel: "Rafael Costa", probabilidade: 30, etapa: "Contato" },
  { id: "5", empresa: "Smart Solutions", valor: 2000, responsavel: "Amanda Souza", probabilidade: 50, etapa: "Proposta" },
  { id: "6", empresa: "Agência Flow", valor: 1500, responsavel: "Rafael Costa", probabilidade: 20, etapa: "Lead" },
  { id: "7", empresa: "Marca Forte", valor: 4000, responsavel: "Amanda Souza", probabilidade: 70, etapa: "Negociação" },
];

export const MOCK_ALERTAS = [
  { id: "1", tipo: "inadimplente", titulo: "Cliente inadimplente", descricao: "MKT Express - fatura vencida há 15 dias", data: "2024-12-01", severidade: "alta" },
  { id: "2", tipo: "atraso", titulo: "Tarefa atrasada", descricao: "Automação Email Marketing - Inova Digital", data: "2024-12-08", severidade: "alta" },
  { id: "3", tipo: "vencimento", titulo: "Contrato próximo do vencimento", descricao: "JP Consultoria - vence em 10 dias", data: "2024-12-20", severidade: "media" },
  { id: "4", tipo: "inadimplente", titulo: "Cliente inadimplente", descricao: "JP Consultoria - fatura vencida há 20 dias", data: "2024-11-25", severidade: "alta" },
  { id: "5", tipo: "vencimento", titulo: "Cobrança próxima", descricao: "TechVision Ltda. - vencimento em 5 dias", data: "2024-12-15", severidade: "baixa" },
];

export const MOCK_PLANOS = [
  { id: "1", nome: "Starter", valor: 400, features: ["1 projeto ativo", "Suporte por email", "Relatórios básicos"], clientes: 38 },
  { id: "2", nome: "Growth", valor: 800, features: ["3 projetos ativos", "Suporte prioritário", "Relatórios avançados", "Automações"], clientes: 52 },
  { id: "3", nome: "Pro", valor: 1200, features: ["5 projetos ativos", "Suporte dedicado", "Relatórios personalizados", "Automações ilimitadas", "API access"], clientes: 35 },
  { id: "4", nome: "Scale", valor: 2500, features: ["Projetos ilimitados", "Account Manager", "SLA garantido", "Consultoria estratégica", "White label"], clientes: 17 },
];
