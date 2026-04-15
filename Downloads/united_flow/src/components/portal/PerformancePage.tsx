import { useState } from "react";
import { Globe, Instagram, Leaf, Layers, Calendar } from "lucide-react";
import { PERF_KPIS, CHART_DATA, FUNNEL } from "@/data/portal-data";
import { PageHeader, PortalCard, DeltaBadge, FilterDropdown, PortalBarChart, FunnelViz } from "./Primitives";

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  "Todos": <Layers size={14} />,
  "Google Ads": <Globe size={14} />,
  "Meta Ads": <Instagram size={14} />,
  "Orgânico": <Leaf size={14} />,
};

const PERIOD_ICONS: Record<string, React.ReactNode> = {
  "Todos": <Calendar size={14} />,
  "7d": <Calendar size={14} />,
  "30d": <Calendar size={14} />,
  "90d": <Calendar size={14} />,
  "12m": <Calendar size={14} />,
};

export function PerformancePage() {
  const [channel, setChannel] = useState("Todos");
  const [period, setPeriod] = useState("12m");
  const sliceMap: Record<string, number> = { "7d": 1, "30d": 2, "90d": 3, "12m": 6 };
  const slice = sliceMap[period] || 6;
  const chartSlice = CHART_DATA.slice(-slice);

  return (
    <div>
      <PageHeader title="Performance" subtitle="Indicadores e métricas de desempenho" />
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <FilterDropdown options={["Todos", "Google Ads", "Meta Ads", "Orgânico"]} active={channel} onChange={setChannel} label="Canal" icons={CHANNEL_ICONS} />
        <FilterDropdown options={["Todos", "7d", "30d", "90d", "12m"]} active={period} onChange={setPeriod} label="Período" icon={<Calendar size={14} />} icons={PERIOD_ICONS} />
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <PortalCard>
          <div className="p-5">
            <p className="text-sm font-bold text-text-1">Leads por Período</p>
            <p className="text-[11px] text-text-3 mb-1">{channel === "Todos" ? "Todos os canais" : channel}</p>
            <PortalBarChart data={chartSlice} dataKey="leads" />
          </div>
        </PortalCard>
        <PortalCard>
          <div className="p-5">
            <p className="text-sm font-bold text-text-1">Conversões</p>
            <p className="text-[11px] text-text-3 mb-1">Fechamentos realizados</p>
            <PortalBarChart data={chartSlice} dataKey="conv" />
          </div>
        </PortalCard>
      </div>

      <PortalCard>
        <div className="p-5">
          <p className="text-sm font-bold text-text-1 mb-3">Funil de Aquisição Completo</p>
          <FunnelViz data={FUNNEL} />
          <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
            {FUNNEL.map((f, i) => (
              <div key={i} className="text-center">
                <p className="text-lg font-bold text-text-1">{f.v.toLocaleString("pt-BR")}</p>
                <p className="text-[11px] text-text-3">{f.s}</p>
                {i > 0 && <p className="text-[10px] text-text-4">{f.p}% do topo</p>}
              </div>
            ))}
          </div>
        </div>
      </PortalCard>
    </div>
  );
}
