import { Download, Plus, ArrowRight } from "lucide-react";
import { PERF_KPIS, CHART_DATA, FUNNEL, PRIO_TAG } from "@/data/portal-data";
import { PortalCard, PortalBtn, PageHeader, DeltaBadge, Tag, ScoreRing, PortalBarChart, FunnelViz } from "./Primitives";

export function DashboardPage({ onNav }: { onNav: (id: string) => void }) {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Visão geral da sua operação"
        action={
          <>
            <PortalBtn variant="ghost" size="sm"><Download size={12} className="inline mr-1" />Exportar</PortalBtn>
            <PortalBtn size="sm"><Plus size={12} className="inline mr-1" />Solicitação</PortalBtn>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {PERF_KPIS.map((k, i) => (
          <PortalCard key={i} lift>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-3 font-medium">{k.label}</span>
                <DeltaBadge delta={k.delta} />
              </div>
              <div className="text-2xl font-bold text-text-1">{k.value}</div>
              <p className="text-[11px] text-text-3 mt-1">{k.sub}</p>
            </div>
          </PortalCard>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <PortalCard style={{ gridColumn: "span 1" }}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-sm font-bold text-text-1">Leads por Período</p>
                <p className="text-[11px] text-text-3">Últimos 6 meses</p>
              </div>
            </div>
            <PortalBarChart data={CHART_DATA} dataKey="leads" />
          </div>
        </PortalCard>
        <PortalCard>
          <div className="p-5">
            <p className="text-sm font-bold text-text-1 mb-2">Funil de Aquisição</p>
            <FunnelViz data={FUNNEL} />
          </div>
        </PortalCard>
        <PortalCard>
          <div className="p-5">
            <p className="text-sm font-bold text-text-1 mb-2">Growth Score</p>
            <ScoreRing score={87} />
            <div className="text-center mt-3">
              <p className="text-xs font-bold text-text-1">Alta Performance</p>
              <p className="text-[11px] text-text-3">Top 15% dos clientes</p>
            </div>
          </div>
        </PortalCard>
      </div>

      {/* Insights + Próximas Entregas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PortalCard>
          <div className="p-5">
            <p className="text-sm font-bold text-text-1 mb-3">Central de Insights</p>
            {[
              { text: "Leads cresceram 42% em relação ao mês anterior", badge: { l: "Alta", c: "#22C55E", bg: "rgba(34,197,94,0.12)" } },
              { text: "CPL caiu 18% — melhor resultado do trimestre", badge: { l: "Otimização", c: "#3B82F6", bg: "rgba(59,130,246,0.12)" } },
              { text: "ROI 4,2× supera meta contratual de 3,5×", badge: { l: "Meta ✓", c: "#F59E0B", bg: "rgba(245,158,11,0.12)" } },
              { text: "3 entregas agendadas para esta semana", badge: { l: "Atenção", c: "#888", bg: "rgba(128,128,128,.1)" } },
            ].map((ins, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <p className="text-xs text-text-2">{ins.text}</p>
                <Tag label={ins.badge.l} color={ins.badge.c} bg={ins.badge.bg} />
              </div>
            ))}
          </div>
        </PortalCard>
        <PortalCard>
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-text-1">Próximas Entregas</p>
              <button onClick={() => onNav("producao")} className="bg-transparent border-none text-text-3 text-xs cursor-pointer font-semibold hover:text-text-2 transition-colors flex items-center gap-1">
                Ver tudo <ArrowRight size={12} />
              </button>
            </div>
            {[
              { title: "Estratégia de Conteúdo Q2", owner: "Rafael L.", due: "07 Mar", prio: "Alta" },
              { title: "Vídeo Apresentação Institucional", owner: "Ana S.", due: "12 Mar", prio: "Alta" },
              { title: "Campanha Google Ads — Abril", owner: "Rafael L.", due: "15 Mar", prio: "Média" },
            ].map((item, i) => {
              const pt = PRIO_TAG[item.prio] || { c: "#888", bg: "rgba(128,128,128,.1)" };
              return (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <div>
                    <p className="text-xs font-semibold text-text-1">{item.title}</p>
                    <p className="text-[11px] text-text-3">{item.owner}</p>
                  </div>
                  <Tag label={item.prio} color={pt.c} bg={pt.bg} />
                  <span className="text-[11px] text-text-3">{item.due}</span>
                </div>
              );
            })}
          </div>
        </PortalCard>
      </div>
    </div>
  );
}
