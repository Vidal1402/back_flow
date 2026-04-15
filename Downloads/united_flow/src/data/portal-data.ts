export const C = {
  green: "#22C55E", greenBg: "rgba(34,197,94,0.12)",
  blue: "#3B82F6", blueBg: "rgba(59,130,246,0.12)",
  purple: "#A855F7", purpleBg: "rgba(168,85,247,0.12)",
  red: "#EF4444", redBg: "rgba(239,68,68,0.12)",
  amber: "#F59E0B", amberBg: "rgba(245,158,11,0.12)",
  cyan: "#06B6D4", cyanBg: "rgba(6,182,212,0.12)",
  orange: "#F97316", orangeBg: "rgba(249,115,22,0.12)",
  pink: "#EC4899", pinkBg: "rgba(236,72,153,0.12)",
};

export const KANBAN_COLS = [
  { id: "sol", label: "Solicitações", dot: C.amber, cards: [
    { id: 1, title: "Landing Page — Black Friday", type: "Landing Page", owner: "Carla M.", due: "08 Mar", priority: "Alta", comments: 3, files: 1 },
    { id: 2, title: "Criativo Stories — Lançamento", type: "Criativo", owner: "Bruno T.", due: "10 Mar", priority: "Média", comments: 0, files: 2 },
  ]},
  { id: "pend", label: "Pendentes", dot: "#888", cards: [
    { id: 3, title: "Automação de Email — Onboarding", type: "Automação", owner: "Lucas P.", due: "14 Mar", priority: "Média", comments: 1, files: 0 },
  ]},
  { id: "prod", label: "Em Produção", dot: C.blue, cards: [
    { id: 4, title: "Campanha Google Ads — Abril", type: "Campanha", owner: "Rafael L.", due: "15 Mar", priority: "Alta", comments: 5, files: 3 },
    { id: 5, title: "Vídeo Apresentação Institucional", type: "Vídeo", owner: "Ana S.", due: "12 Mar", priority: "Alta", comments: 2, files: 4 },
    { id: 6, title: "Funil de Vendas — Infoproduto", type: "Funil", owner: "Carla M.", due: "18 Mar", priority: "Média", comments: 4, files: 1 },
  ]},
  { id: "rev", label: "Em Revisão", dot: C.orange, cards: [
    { id: 7, title: "Estratégia de Conteúdo Q2", type: "Estratégia", owner: "Rafael L.", due: "07 Mar", priority: "Alta", comments: 8, files: 2 },
  ]},
  { id: "done", label: "Entregue", dot: C.green, cards: [
    { id: 8, title: "Identidade Visual — Revamp 2025", type: "Criativo", owner: "Bruno T.", due: "01 Mar", priority: "Baixa", comments: 6, files: 9 },
    { id: 9, title: "Relatório Estratégico Q1", type: "Relatório", owner: "Rafael L.", due: "28 Fev", priority: "Baixa", comments: 2, files: 1 },
  ]},
];

export const TYPE_TAG: Record<string, { c: string; bg: string }> = {
  "Landing Page": { c: C.blue, bg: C.blueBg },
  "Criativo": { c: C.amber, bg: C.amberBg },
  "Campanha": { c: C.purple, bg: C.purpleBg },
  "Vídeo": { c: C.pink, bg: C.pinkBg },
  "Automação": { c: C.cyan, bg: C.cyanBg },
  "Funil": { c: C.orange, bg: C.orangeBg },
  "Estratégia": { c: C.green, bg: C.greenBg },
  "Relatório": { c: "#888", bg: "rgba(128,128,128,0.12)" },
};

export const PRIO_TAG: Record<string, { c: string; bg: string }> = {
  "Alta": { c: C.red, bg: C.redBg },
  "Média": { c: C.amber, bg: C.amberBg },
  "Baixa": { c: "#888", bg: "rgba(128,128,128,0.1)" },
};

export const CHART_DATA = [
  { m: "Out", leads: 620, inv: 12000, conv: 54 },
  { m: "Nov", leads: 780, inv: 13500, conv: 68 },
  { m: "Dez", leads: 710, inv: 14200, conv: 61 },
  { m: "Jan", leads: 890, inv: 15800, conv: 79 },
  { m: "Fev", leads: 1050, inv: 17200, conv: 95 },
  { m: "Mar", leads: 1284, inv: 18400, conv: 112 },
];

export const FUNNEL = [
  { s: "Tráfego", v: 42800, p: 100 },
  { s: "Leads", v: 1284, p: 30 },
  { s: "Reuniões", v: 312, p: 7.3 },
  { s: "Clientes", v: 128, p: 3.0 },
];

export const PERF_KPIS = [
  { label: "Leads Gerados", value: "1.284", delta: "+42%", sub: "vs. mês anterior" },
  { label: "Investimento", value: "R$18,4k", delta: "+12%", sub: "Meta: R$20k" },
  { label: "CAC", value: "R$143", delta: "−18%", sub: "Meta: R$160" },
  { label: "ROI", value: "4,2×", delta: "+0,8×", sub: "Meta: 3,5× ✓" },
];

export const REPORTS = [
  { id: 1, title: "Relatório Mensal — Fevereiro 2025", type: "Mensal", period: "Fev 2025", owner: "Rafael L.", date: "01 Mar", pages: 12 },
  { id: 2, title: "Relatório de Campanha — Google Q1", type: "Campanha", period: "Jan–Mar 2025", owner: "Lucas P.", date: "20 Fev", pages: 8 },
  { id: 3, title: "Relatório Estratégico Semestral", type: "Estratégico", period: "Jul–Dez 2024", owner: "Rafael L.", date: "05 Jan", pages: 24 },
  { id: 4, title: "Relatório de Tráfego — Dezembro 2024", type: "Tráfego", period: "Dez 2024", owner: "Ana S.", date: "02 Jan", pages: 6 },
  { id: 5, title: "Relatório de Crescimento Q4 2024", type: "Crescimento", period: "Out–Dez 2024", owner: "Rafael L.", date: "10 Jan", pages: 18 },
  { id: 6, title: "Relatório Mensal — Janeiro 2025", type: "Mensal", period: "Jan 2025", owner: "Ana S.", date: "01 Fev", pages: 11 },
];

export const RPT_COLOR: Record<string, string> = {
  Mensal: C.blue,
  Campanha: C.purple,
  Estratégico: C.amber,
  Tráfego: C.cyan,
  Crescimento: C.green,
};

export const MAT_FOLDERS = [
  { id: "criativos", label: "Criativos", icon: "Palette", count: 24, size: "156 MB" },
  { id: "campanhas", label: "Campanhas", icon: "Megaphone", count: 12, size: "89 MB" },
  { id: "branding", label: "Branding", icon: "Diamond", count: 8, size: "210 MB" },
  { id: "videos", label: "Vídeos", icon: "Play", count: 6, size: "1.2 GB" },
  { id: "docs", label: "Documentos", icon: "FileText", count: 18, size: "45 MB" },
  { id: "relatorios", label: "Relatórios", icon: "PieChart", count: 9, size: "32 MB" },
];

export const FILES: Record<string, Array<{ name: string; ext: string; size: string; date: string }>> = {
  criativos: [
    { name: "Banner_BlackFriday_1080x1080.png", ext: "PNG", size: "2.1 MB", date: "02 Mar" },
    { name: "Stories_Lançamento_v3.psd", ext: "PSD", size: "45 MB", date: "28 Fev" },
    { name: "Post_Carrossel_Produto.ai", ext: "AI", size: "8.3 MB", date: "25 Fev" },
    { name: "Creative_Set_Q1_2025.zip", ext: "ZIP", size: "120 MB", date: "15 Fev" },
  ],
  campanhas: [
    { name: "Campanha_GoogleAds_Abril.pdf", ext: "PDF", size: "1.2 MB", date: "01 Mar" },
    { name: "Briefing_MetaAds_Promo.docx", ext: "DOCX", size: "0.4 MB", date: "25 Fev" },
  ],
  branding: [
    { name: "Manual_Marca_TechVision_v2.pdf", ext: "PDF", size: "18 MB", date: "10 Jan" },
    { name: "Logo_Pack_2025.zip", ext: "ZIP", size: "45 MB", date: "08 Jan" },
  ],
  videos: [
    { name: "Apresentação_Institucional_v2.mp4", ext: "MP4", size: "420 MB", date: "28 Fev" },
    { name: "Reels_Produto_30seg.mp4", ext: "MP4", size: "85 MB", date: "22 Fev" },
  ],
  docs: [
    { name: "Estratégia_Q2_2025.pdf", ext: "PDF", size: "2.8 MB", date: "05 Mar" },
    { name: "Contrato_Serviços_2025.pdf", ext: "PDF", size: "1.1 MB", date: "01 Jan" },
  ],
  relatorios: [
    { name: "Relatório_Fev_2025.pdf", ext: "PDF", size: "2.4 MB", date: "01 Mar" },
    { name: "Relatório_Jan_2025.pdf", ext: "PDF", size: "2.2 MB", date: "01 Fev" },
  ],
};

export const MEET_UP = [
  { id: 1, title: "Alinhamento Mensal — Março", date: "10 Mar", time: "14h00", via: "Google Meet", owner: "Rafael L.", agenda: ["Review de performance", "Entregas em andamento", "Planejamento Abril"] },
  { id: 2, title: "Review de Performance Q1", date: "18 Mar", time: "10h00", via: "Zoom", owner: "Lucas P.", agenda: ["Resultados Q1", "Comparativo vs meta", "Próximos passos"] },
  { id: 3, title: "Sprint Planning — Abril", date: "28 Mar", time: "15h00", via: "Google Meet", owner: "Rafael L.", agenda: ["Briefing campanhas", "Prioridades", "Timeline de entregas"] },
];

export const MEET_PAST = [
  { id: 4, title: "Alinhamento Mensal — Fev", date: "10 Fev", via: "Google Meet", dur: "52min", rec: true, ata: true },
  { id: 5, title: "Review de Campanha Google", date: "22 Jan", via: "Zoom", dur: "38min", rec: true, ata: false },
  { id: 6, title: "Onboarding — Kickoff 2025", date: "06 Jan", via: "Zoom", dur: "75min", rec: true, ata: true },
  { id: 7, title: "Planejamento Estratégico", date: "15 Dez", via: "Google Meet", dur: "90min", rec: false, ata: true },
];

export const INVOICES = [
  { id: "FAT-2025-03", period: "Março 2025", value: "R$ 4.800,00", due: "15 Mar", status: "Pendente", paid: null, method: "Pix" },
  { id: "FAT-2025-02", period: "Fevereiro 2025", value: "R$ 4.800,00", due: "15 Fev", status: "Pago", paid: "14 Fev", method: "Cartão de Crédito" },
  { id: "FAT-2025-01", period: "Janeiro 2025", value: "R$ 4.800,00", due: "15 Jan", status: "Pago", paid: "12 Jan", method: "Pix" },
  { id: "FAT-2024-12", period: "Dezembro 2024", value: "R$ 4.500,00", due: "15 Dez", status: "Pago", paid: "15 Dez", method: "Boleto" },
  { id: "FAT-2024-11", period: "Novembro 2024", value: "R$ 4.500,00", due: "15 Nov", status: "Pago", paid: "13 Nov", method: "Transferência" },
];

export const ACADEMY = [
  { id: 1, title: "Como estruturar um Funil de Vendas do zero", cat: "Funil", fmt: "Vídeo", dur: "32min", lvl: "Iniciante", done: true, prog: 100 },
  { id: 2, title: "Meta Ads 2025: Estratégias avançadas", cat: "Tráfego", fmt: "Vídeo", dur: "48min", lvl: "Avançado", done: false, prog: 65 },
  { id: 3, title: "O guia definitivo de Email Marketing", cat: "Marketing", fmt: "Ebook", dur: "45 p.", lvl: "Intermediário", done: false, prog: 0 },
  { id: 4, title: "Google Ads: Lances automáticos vs manuais", cat: "Tráfego", fmt: "Vídeo", dur: "28min", lvl: "Intermediário", done: false, prog: 30 },
  { id: 5, title: "Copywriting que converte: frameworks práticos", cat: "Vendas", fmt: "Guia", dur: "20 p.", lvl: "Iniciante", done: false, prog: 0 },
  { id: 6, title: "Métricas que importam: CAC, LTV e ROI", cat: "Estratégia", fmt: "Treinamento", dur: "55min", lvl: "Intermediário", done: false, prog: 0 },
  { id: 7, title: "Automação de marketing com IA", cat: "Marketing", fmt: "Vídeo", dur: "41min", lvl: "Avançado", done: false, prog: 0 },
  { id: 8, title: "Como criar ofertas irresistíveis", cat: "Vendas", fmt: "Vídeo", dur: "36min", lvl: "Iniciante", done: false, prog: 0 },
];

export const FMT_COLOR: Record<string, string> = { Vídeo: C.blue, Ebook: C.purple, Guia: C.green, Treinamento: C.amber };
export const LVL_COLOR: Record<string, string> = { Iniciante: C.green, Intermediário: C.amber, Avançado: C.red };

export const TICKETS = [
  { id: "#042", cat: "Performance", title: "Dashboard não carrega métricas do Meta Ads", status: "Em análise", created: "03 Mar", updated: "Há 2h" },
  { id: "#038", cat: "Produção", title: "Ajustar prazo da landing page", status: "Concluído", created: "22 Fev", updated: "01 Mar" },
  { id: "#031", cat: "Financeiro", title: "Fatura de Fevereiro não chegou por email", status: "Concluído", created: "10 Fev", updated: "11 Fev" },
];

export const FAQ = [
  { q: "Como solicito uma nova entrega?", a: "Acesse Produção e clique em '+ Nova Solicitação'. Preencha tipo, descrição e prazo desejado. Sua equipe United responde em até 1 dia útil." },
  { q: "Onde encontro os meus criativos finais?", a: "Todos os arquivos entregues ficam na aba Materiais, organizados por pasta. Baixe, visualize ou compartilhe diretamente." },
  { q: "Em quanto tempo recebo retorno de um chamado?", a: "Chamados são respondidos em até 4 horas úteis. Para urgências, use o WhatsApp para contato direto com sua equipe." },
  { q: "Posso adicionar outros usuários?", a: "Sim. Acesse Configurações > Usuários e convide membros da equipe com permissões de visualização ou edição." },
  { q: "Como funciona o ciclo de relatórios?", a: "Relatórios mensais são entregues até o 3º dia útil de cada mês. Relatórios de campanha podem ser solicitados a qualquer momento." },
];

export const NAV = [
  { id: "dashboard", icon: "LayoutDashboard", label: "Dashboard", b: 3 },
  { id: "relatorios", icon: "BarChart3", label: "Relatórios" },
  { id: "materiais", icon: "FolderOpen", label: "Materiais" },
  { id: "financeiro", icon: "CreditCard", label: "Financeiro" },
  { id: "planos", icon: "Crown", label: "Planos" },
  { id: "academy", icon: "GraduationCap", label: "Academy", locked: true },
  { id: "suporte", icon: "LifeBuoy", label: "Suporte", b: 1 },
  { id: "config", icon: "Settings", label: "Configurações" },
];
