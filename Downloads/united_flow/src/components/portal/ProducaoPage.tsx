import { useState, useCallback } from "react";
import {
  MessageSquare, Paperclip, Plus, Kanban, Table,
  ChevronDown, ChevronRight, CheckCircle, Clock,
  AlertTriangle, TrendingUp,
  Layers, Globe, Palette, Mail, Megaphone,
  Video, Target, BarChart3, FileText, GripVertical,
} from "lucide-react";
import { KANBAN_COLS, TYPE_TAG, PRIO_TAG } from "@/data/portal-data";
import { PageHeader, PortalBtn, FilterDropdown, Tag, PortalCard, DeltaBadge } from "./Primitives";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ── Types ── */
type CardType = (typeof KANBAN_COLS)[number]["cards"][number];
type ColType = { id: string; label: string; dot: string; cards: CardType[] };

/* ── Type icon mapping ── */
const TYPE_ICONS: Record<string, React.ReactNode> = {
  "Todos": <Layers size={14} />,
  "Landing Page": <Globe size={14} />,
  "Criativo": <Palette size={14} />,
  "Automação": <Mail size={14} />,
  "Campanha": <Megaphone size={14} />,
  "Vídeo": <Video size={14} />,
  "Funil": <Target size={14} />,
  "Estratégia": <BarChart3 size={14} />,
  "Relatório": <FileText size={14} />,
};

/* ── Card Content (shared between sortable and overlay) ── */
function CardContent({ card, isDragging = false }: { card: CardType; isDragging?: boolean }) {
  const tt = TYPE_TAG[card.type] || { c: "#888", bg: "rgba(128,128,128,.1)" };
  const pt = PRIO_TAG[card.priority] || { c: "#888", bg: "rgba(128,128,128,.1)" };
  return (
    <div
      className={`bg-card border rounded-lg p-3.5 transition-all duration-200 ${
        isDragging
          ? "border-primary shadow-lg opacity-90 rotate-[2deg] scale-105"
          : "border-border hover:border-border-strong hover:-translate-y-0.5 hover:shadow-card-hover"
      }`}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Tag label={card.type} color={tt.c} bg={tt.bg} />
        <Tag label={card.priority} color={pt.c} bg={pt.bg} />
      </div>
      <p className="text-xs font-semibold text-text-1 mb-2 leading-snug">{card.title}</p>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-5 rounded-full bg-surface-4 flex items-center justify-center text-[9px] font-bold text-text-2">
          {card.owner.split(" ").map((p: string) => p[0]).join("")}
        </span>
        <span className="text-[11px] text-text-3">{card.owner}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[11px] text-text-3">
          {card.comments > 0 && <span className="flex items-center gap-1"><MessageSquare size={12} /> {card.comments}</span>}
          {card.files > 0 && <span className="flex items-center gap-1"><Paperclip size={12} /> {card.files}</span>}
        </div>
        <span className="text-[10px] text-text-3">{card.due}</span>
      </div>
    </div>
  );
}

/* ── Sortable Kanban Card ── */
function SortableCard({ card }: { card: CardType }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
      <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-opacity z-10 pointer-events-none">
        <GripVertical size={14} className="text-text-3" />
      </div>
      <CardContent card={card} />
    </div>
  );
}

/* ── Droppable Column ── */
function DroppableColumn({ col }: { col: ColType }) {
  return (
    <div className="min-w-[260px] flex-1">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full" style={{ background: col.dot }} />
        <span className="text-xs font-bold text-text-1">{col.label}</span>
        <span className="text-[10px] text-text-3 bg-surface-3 px-1.5 rounded">
          {col.cards.length}
        </span>
      </div>
      <div className="h-px bg-border mb-3" />
      <SortableContext items={col.cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3 min-h-[60px]">
          {col.cards.map((c) => (
            <SortableCard key={c.id} card={c} />
          ))}
          {col.cards.length === 0 && (
            <div className="border-2 border-dashed border-border rounded-lg py-8 flex items-center justify-center">
              <p className="text-xs text-text-4">Arraste itens aqui</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

/* ── Status pill (colored like Monday) ── */
function StatusPill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="text-[11px] font-bold px-3 py-1 rounded text-white inline-block min-w-[90px] text-center"
      style={{ background: color }}
    >
      {label}
    </span>
  );
}

/* ── Priority pill ── */
function PrioPill({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    Alta: "#EF4444",
    Média: "#F59E0B",
    Baixa: "#888",
  };
  return <StatusPill label={priority} color={colors[priority] || "#888"} />;
}

/* ── Status color mapping ── */
const COL_STATUS_COLOR: Record<string, string> = {
  sol: "#F59E0B",
  pend: "#888",
  prod: "#3B82F6",
  rev: "#F97316",
  done: "#22C55E",
};

/* ── Monday-style Table View ── */
function TableView({ cols }: { cols: ColType[] }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col gap-6">
      {cols.map((col) => {
        const isCollapsed = collapsed[col.id] || false;
        return (
          <div key={col.id}>
            <button
              onClick={() => toggle(col.id)}
              className="flex items-center gap-2 mb-2 bg-transparent border-none cursor-pointer group"
            >
              {isCollapsed ? <ChevronRight size={16} style={{ color: col.dot }} /> : <ChevronDown size={16} style={{ color: col.dot }} />}
              <span className="text-sm font-bold" style={{ color: col.dot }}>{col.label}</span>
              <span className="text-[11px] text-text-3 bg-surface-3 px-1.5 rounded">{col.cards.length}</span>
            </button>

            {!isCollapsed && (
              <div className="bg-card border border-border rounded-lg overflow-x-auto">
                <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border text-[11px] font-semibold text-text-3 uppercase tracking-wider">
                  <span className="col-span-4">Tarefa</span>
                  <span className="col-span-2">Responsável</span>
                  <span className="col-span-1">Prazo</span>
                  <span className="col-span-2 text-center">Status</span>
                  <span className="col-span-2 text-center">Prioridade</span>
                  <span className="col-span-1 text-center">Tipo</span>
                </div>
                {col.cards.map((card) => {
                  const tt = TYPE_TAG[card.type] || { c: "#888", bg: "rgba(128,128,128,.1)" };
                  const statusColor = COL_STATUS_COLOR[col.id] || "#888";
                  return (
                    <div key={card.id} className="grid grid-cols-12 px-4 py-3 border-b border-border last:border-0 items-center hover:bg-surface-3 transition-colors cursor-pointer">
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="w-1 h-8 rounded-full shrink-0" style={{ background: col.dot }} />
                        <p className="text-xs font-semibold text-text-1 truncate">{card.title}</p>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-surface-4 flex items-center justify-center text-[9px] font-bold text-text-2 shrink-0">
                          {card.owner.split(" ").map((p: string) => p[0]).join("")}
                        </span>
                        <span className="text-xs text-text-2 truncate">{card.owner}</span>
                      </div>
                      <span className="col-span-1 text-xs text-text-3">{card.due}</span>
                      <div className="col-span-2 flex justify-center"><StatusPill label={col.label} color={statusColor} /></div>
                      <div className="col-span-2 flex justify-center"><PrioPill priority={card.priority} /></div>
                      <div className="col-span-1 flex justify-center"><Tag label={card.type} color={tt.c} bg={tt.bg} /></div>
                    </div>
                  );
                })}
                {col.cards.length === 0 && <p className="text-xs text-text-4 text-center py-6">Nenhum item</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Page ── */
export function ProducaoPage() {
  const [filter, setFilter] = useState("Todos");
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [columns, setColumns] = useState<ColType[]>(KANBAN_COLS);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const allTypes = [
    "Todos",
    ...Array.from(new Set(columns.flatMap((c) => c.cards.map((x) => x.type)))),
  ];

  const filteredCols = columns.map((c) => ({
    ...c,
    cards: filter === "Todos" ? c.cards : c.cards.filter((x) => x.type === filter),
  }));

  const findColumn = useCallback((cardId: number): string | undefined => {
    return columns.find(col => col.cards.some(card => card.id === cardId))?.id;
  }, [columns]);

  const handleDragStart = (event: DragStartEvent) => {
    const cardId = event.active.id as number;
    for (const col of columns) {
      const card = col.cards.find(c => c.id === cardId);
      if (card) { setActiveCard(card); break; }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id;

    const activeColId = findColumn(activeId);
    // overId could be a card id or a column id
    let overColId = findColumn(overId as number) || columns.find(c => c.id === String(overId))?.id;

    if (!activeColId || !overColId || activeColId === overColId) return;

    setColumns(prev => {
      const activeCol = prev.find(c => c.id === activeColId)!;
      const overCol = prev.find(c => c.id === overColId)!;
      const card = activeCol.cards.find(c => c.id === activeId)!;
      const overCardIndex = overCol.cards.findIndex(c => c.id === (overId as number));

      return prev.map(col => {
        if (col.id === activeColId) {
          return { ...col, cards: col.cards.filter(c => c.id !== activeId) };
        }
        if (col.id === overColId) {
          const newCards = [...col.cards];
          const insertAt = overCardIndex >= 0 ? overCardIndex : newCards.length;
          newCards.splice(insertAt, 0, card);
          return { ...col, cards: newCards };
        }
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over || active.id === over.id) return;

    const activeId = active.id as number;
    const overId = over.id as number;
    const colId = findColumn(activeId);
    if (!colId) return;

    // Reorder within same column
    const overColId = findColumn(overId);
    if (colId === overColId) {
      setColumns(prev =>
        prev.map(col => {
          if (col.id !== colId) return col;
          const oldIndex = col.cards.findIndex(c => c.id === activeId);
          const newIndex = col.cards.findIndex(c => c.id === overId);
          return { ...col, cards: arrayMove(col.cards, oldIndex, newIndex) };
        })
      );
    }
  };

  return (
    <div>
      <PageHeader
        title="Produção"
        subtitle="Gestão de entregas e solicitações"
        action={
          <PortalBtn size="sm">
            <Plus size={12} className="inline mr-1" />
            Nova Solicitação
          </PortalBtn>
        }
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
        <FilterDropdown options={allTypes} active={filter} onChange={setFilter} label="Tipo" icons={TYPE_ICONS} />

        <div className="flex items-center gap-1 bg-surface-3 rounded-lg p-1 shrink-0">
          {([
            { id: "kanban" as const, Icon: Kanban, label: "Kanban" },
            { id: "table" as const, Icon: Table, label: "Tabela" },
          ]).map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer border-none transition-all
                ${view === id
                  ? "bg-card text-text-1 border border-border-strong shadow-sm"
                  : "bg-transparent text-text-3 hover:text-text-2"
                }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "kanban" ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {filteredCols.map((col) => (
              <DroppableColumn key={col.id} col={col} />
            ))}
          </div>
          <DragOverlay>
            {activeCard ? (
              <div className="w-[260px]">
                <CardContent card={activeCard} isDragging />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <TableView cols={filteredCols} />
      )}

      {/* ── Production Widgets ── */}
      <div className="mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Entregas no Mês", value: "12", delta: "+3", sub: "vs. mês anterior", Icon: CheckCircle },
            { label: "Em Andamento", value: "6", delta: "+2", sub: "tarefas ativas", Icon: Clock },
            { label: "SLA Médio", value: "4,2 dias", delta: "−0,8d", sub: "Meta: 5 dias", Icon: TrendingUp },
            { label: "Taxa de Aprovação", value: "94%", delta: "+6%", sub: "1ª revisão", Icon: CheckCircle },
          ].map((k, i) => (
            <PortalCard key={i} lift>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-3 font-medium flex items-center gap-1.5">
                    <k.Icon size={14} className="text-primary" />
                    {k.label}
                  </span>
                  <DeltaBadge delta={k.delta} />
                </div>
                <div className="text-2xl font-bold text-text-1">{k.value}</div>
                <p className="text-[11px] text-text-3 mt-1">{k.sub}</p>
              </div>
            </PortalCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <PortalCard>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-text-1">Próximas Entregas</p>
                <span className="text-[11px] text-text-3">Esta semana</span>
              </div>
              {[
                { title: "Campanha Google Ads — Abril", owner: "Rafael L.", due: "15 Mar", prio: "Alta" },
                { title: "Vídeo Apresentação Institucional", owner: "Ana S.", due: "12 Mar", prio: "Alta" },
                { title: "Estratégia de Conteúdo Q2", owner: "Rafael L.", due: "07 Mar", prio: "Alta" },
                { title: "Funil de Vendas — Infoproduto", owner: "Carla M.", due: "18 Mar", prio: "Média" },
              ].map((item, i) => {
                const pt = PRIO_TAG[item.prio] || { c: "#888", bg: "rgba(128,128,128,.1)" };
                return (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-surface-4 flex items-center justify-center text-[9px] font-bold text-text-2">
                        {item.owner.split(" ").map(p => p[0]).join("")}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-text-1">{item.title}</p>
                        <p className="text-[11px] text-text-3">{item.owner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag label={item.prio} color={pt.c} bg={pt.bg} />
                      <span className="text-[11px] text-text-3 w-14 text-right">{item.due}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </PortalCard>

          <PortalCard>
            <div className="p-5">
              <p className="text-sm font-bold text-text-1 mb-3">Insights de Produção</p>
              {[
                { text: "6 entregas concluídas antes do prazo neste mês", icon: CheckCircle, badge: { l: "Destaque", c: "#22C55E", bg: "rgba(34,197,94,0.12)" } },
                { text: "SLA melhorou 16% em relação ao trimestre anterior", icon: TrendingUp, badge: { l: "Melhoria", c: "#3B82F6", bg: "rgba(59,130,246,0.12)" } },
                { text: "2 entregas com prazo próximo precisam de atenção", icon: AlertTriangle, badge: { l: "Atenção", c: "#F59E0B", bg: "rgba(245,158,11,0.12)" } },
                { text: "Taxa de revisão caiu — qualidade em alta", icon: CheckCircle, badge: { l: "Qualidade", c: "#A855F7", bg: "rgba(168,85,247,0.12)" } },
              ].map((ins, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0 gap-3">
                  <div className="flex items-center gap-2.5">
                    <ins.icon size={14} className="text-text-3 shrink-0" />
                    <p className="text-xs text-text-2">{ins.text}</p>
                  </div>
                  <Tag label={ins.badge.l} color={ins.badge.c} bg={ins.badge.bg} />
                </div>
              ))}
            </div>
          </PortalCard>
        </div>

        <PortalCard>
          <div className="p-5">
            <p className="text-sm font-bold text-text-1 mb-4">Histórico de Entregas</p>
            <div className="relative">
              {[
                { title: "Identidade Visual — Revamp 2025", owner: "Bruno T.", date: "01 Mar", status: "Entregue" },
                { title: "Relatório Estratégico Q1", owner: "Rafael L.", date: "28 Fev", status: "Entregue" },
                { title: "Campanha Meta Ads — Março", owner: "Lucas P.", date: "25 Fev", status: "Entregue" },
                { title: "Email Marketing — Sequência Onboarding", owner: "Carla M.", date: "20 Fev", status: "Entregue" },
                { title: "Criativos Instagram — Fevereiro", owner: "Ana S.", date: "15 Fev", status: "Entregue" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 pb-4 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary/30 shrink-0" />
                    {i < 4 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="flex-1 flex items-center justify-between pb-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-xs font-semibold text-text-1">{item.title}</p>
                      <p className="text-[11px] text-text-3">{item.owner} · {item.date}</p>
                    </div>
                    <Tag label={item.status} color="#22C55E" bg="rgba(34,197,94,0.12)" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PortalCard>
      </div>
    </div>
  );
}
