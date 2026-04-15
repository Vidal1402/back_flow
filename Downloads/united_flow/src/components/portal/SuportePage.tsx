import { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { TICKETS, FAQ } from "@/data/portal-data";
import { PageHeader, PortalBtn, PortalCard, StatusBadge } from "./Primitives";

export function SuportePage() {
  const [expFaq, setExpFaq] = useState<number | null>(null);

  return (
    <div>
      <PageHeader title="Suporte" subtitle="Chamados, dúvidas e ajuda" action={<PortalBtn size="sm"><Plus size={12} className="inline mr-1" />Novo Chamado</PortalBtn>} />

      <p className="text-[10px] font-bold text-text-3 uppercase tracking-widest mb-3">CHAMADOS RECENTES</p>
      <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
        {TICKETS.map((tk) => (
          <div key={tk.id} className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-surface-3 transition-colors cursor-pointer">
            <span className="text-xs font-bold text-text-3">{tk.id}</span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-text-1">{tk.title}</p>
              <p className="text-[11px] text-text-3">{tk.cat} · Aberto em {tk.created}</p>
            </div>
            <StatusBadge status={tk.status} />
            <span className="text-[11px] text-text-3">{tk.updated}</span>
          </div>
        ))}
      </div>

      <p className="text-[10px] font-bold text-text-3 uppercase tracking-widest mb-3">PERGUNTAS FREQUENTES</p>
      <div className="flex flex-col gap-2">
        {FAQ.map((f, i) => (
          <PortalCard key={i}>
            <button
              onClick={() => setExpFaq(expFaq === i ? null : i)}
              className="w-full px-5 py-4 flex items-center justify-between text-left bg-transparent border-none cursor-pointer"
            >
              <span className="text-xs font-semibold text-text-1">{f.q}</span>
              {expFaq === i ? <ChevronUp size={16} className="text-text-3" /> : <ChevronDown size={16} className="text-text-3" />}
            </button>
            {expFaq === i && (
              <div className="px-5 pb-4 -mt-1">
                <p className="text-xs text-text-2 leading-relaxed">{f.a}</p>
              </div>
            )}
          </PortalCard>
        ))}
      </div>
    </div>
  );
}
