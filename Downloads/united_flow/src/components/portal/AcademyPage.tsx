import { useState } from "react";
import { ArrowRight, CheckCircle, BookOpen, Video, FileText, Layers } from "lucide-react";
import { ACADEMY, FMT_COLOR, LVL_COLOR } from "@/data/portal-data";
import { PageHeader, FilterDropdown, Tag, PortalCard } from "./Primitives";

const CAT_ICONS: Record<string, React.ReactNode> = {
  "Todos": <Layers size={14} />,
  "Marketing": <BookOpen size={14} />,
  "Vendas": <FileText size={14} />,
  "Estratégia": <Video size={14} />,
};

export function AcademyPage() {
  const [catFilter, setCatFilter] = useState("Todos");
  const allCats = ["Todos", ...Array.from(new Set(ACADEMY.map((a) => a.cat)))];
  const items = catFilter === "Todos" ? ACADEMY : ACADEMY.filter((a) => a.cat === catFilter);

  return (
    <div>
      <PageHeader title="Academy" subtitle="Conteúdos exclusivos para acelerar seus resultados" />
      <div className="mb-5">
        <FilterDropdown options={allCats} active={catFilter} onChange={setCatFilter} label="Categoria" icon={<BookOpen size={14} />} icons={CAT_ICONS} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const fc = FMT_COLOR[item.fmt] || "#888";
          const lc = LVL_COLOR[item.lvl] || "#888";
          return (
            <PortalCard key={item.id} lift>
              <div className="p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <Tag label={item.fmt} color={fc} bg={fc + "1f"} />
                  <Tag label={item.lvl} color={lc} bg={lc + "1f"} />
                </div>
                <p className="text-sm font-semibold text-text-1 mb-1 leading-snug">{item.title}</p>
                <p className="text-[11px] text-text-3 mb-3">{item.cat} · {item.dur}</p>
                {item.prog > 0 && (
                  <div className="mb-2">
                    <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${item.prog}%` }} />
                    </div>
                    <p className="text-[10px] text-text-3 mt-1">{item.prog}% concluído</p>
                  </div>
                )}
                {item.done && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded" style={{ color: "#22C55E", background: "rgba(34,197,94,0.12)" }}>
                    <CheckCircle size={12} /> Concluído
                  </span>
                )}
                {!item.done && item.prog === 0 && (
                  <button className="text-xs font-bold text-primary cursor-pointer bg-transparent border-none hover:opacity-80 transition-opacity flex items-center gap-1">
                    Começar <ArrowRight size={12} />
                  </button>
                )}
                {!item.done && item.prog > 0 && (
                  <button className="text-xs font-bold text-primary cursor-pointer bg-transparent border-none hover:opacity-80 transition-opacity flex items-center gap-1">
                    Continuar <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </PortalCard>
          );
        })}
      </div>
    </div>
  );
}
