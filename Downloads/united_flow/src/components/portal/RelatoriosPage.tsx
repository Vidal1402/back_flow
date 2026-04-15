import { useState } from "react";
import { List, LayoutGrid, Download, FileText, BarChart3, PieChart, TrendingUp, Layers } from "lucide-react";
import { REPORTS, RPT_COLOR } from "@/data/portal-data";
import { PageHeader, FilterDropdown, Tag, PortalCard } from "./Primitives";

const RPT_ICONS: Record<string, React.ReactNode> = {
  "Todos": <Layers size={14} />,
  "Estratégico": <TrendingUp size={14} />,
  "Operacional": <BarChart3 size={14} />,
  "Analítico": <PieChart size={14} />,
};

export function RelatoriosPage() {
  const [tf, setTf] = useState("Todos");
  const [vw, setVw] = useState<"list" | "grid">("list");
  const allTypes = ["Todos", ...Array.from(new Set(REPORTS.map((r) => r.type)))];
  const items = tf === "Todos" ? REPORTS : REPORTS.filter((r) => r.type === tf);

  return (
    <div>
      <PageHeader
        title="Relatórios"
        subtitle="Histórico de entregas analíticas"
        action={
          <div className="flex items-center gap-2">
            {([{ v: "list" as const, Icon: List, label: "Lista" }, { v: "grid" as const, Icon: LayoutGrid, label: "Grade" }]).map(({ v, Icon, label }) => (
              <button
                key={v}
                onClick={() => setVw(v)}
                className={`px-3 py-1.5 rounded-md text-xs cursor-pointer border transition-all flex items-center gap-1.5 ${vw === v ? "bg-surface-3 border-border-strong text-text-1" : "bg-transparent border-border text-text-3"}`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        }
      />
      <div className="mb-5">
        <FilterDropdown options={allTypes} active={tf} onChange={setTf} label="Tipo" icon={<FileText size={14} />} icons={RPT_ICONS} />
      </div>

      {vw === "list" ? (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 px-5 py-3 border-b border-border text-[11px] font-semibold text-text-3 uppercase tracking-wider">
            <span className="col-span-2">Relatório</span>
            <span>Período</span>
            <span>Data</span>
            <span>Tipo</span>
          </div>
          {items.map((r) => {
            const rc = RPT_COLOR[r.type] || "#888";
            return (
              <div key={r.id} className="grid grid-cols-5 px-5 py-3 border-b border-border last:border-0 items-center hover:bg-surface-3 transition-colors cursor-pointer">
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-text-1">{r.title}</p>
                  <p className="text-[11px] text-text-3">{r.owner} · {r.pages} páginas</p>
                </div>
                <span className="text-xs text-text-2">{r.period}</span>
                <span className="text-xs text-text-3">{r.date}</span>
                <div className="flex items-center justify-between">
                  <Tag label={r.type} color={rc} bg={rc + "1f"} />
                  <button className="text-text-3 hover:text-text-1 cursor-pointer bg-transparent border-none flex items-center gap-1 text-xs">
                    <Download size={14} /> PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((r) => {
            const rc = RPT_COLOR[r.type] || "#888";
            return (
              <PortalCard key={r.id} lift>
                <div className="p-5">
                  <div className="w-10 h-10 rounded-lg bg-surface-3 flex items-center justify-center mb-3">
                    <FileText size={20} className="text-text-3" />
                  </div>
                  <Tag label={r.type} color={rc} bg={rc + "1f"} />
                  <p className="text-xs font-semibold text-text-1 mt-2">{r.title}</p>
                  <p className="text-[11px] text-text-3 mt-1">{r.period} · {r.pages} pág.</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-[11px] text-text-3">{r.date}</span>
                    <button className="text-xs text-text-3 hover:text-text-1 cursor-pointer bg-transparent border-none font-semibold flex items-center gap-1">
                      <Download size={12} /> Baixar
                    </button>
                  </div>
                </div>
              </PortalCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
