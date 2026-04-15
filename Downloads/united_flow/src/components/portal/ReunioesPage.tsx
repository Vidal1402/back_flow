import { useState } from "react";
import { Calendar, Clock, VideoIcon, User, ChevronDown, ChevronUp, Circle, Plus } from "lucide-react";
import { MEET_UP, MEET_PAST } from "@/data/portal-data";
import { PageHeader, PortalBtn, PortalCard, StatusBadge, Tag } from "./Primitives";

export function ReunioesPage() {
  const [tab, setTab] = useState("upcoming");
  const [exp, setExp] = useState<number | null>(null);

  return (
    <div>
      <PageHeader title="Reuniões" subtitle="Agenda e histórico de reuniões" action={<PortalBtn size="sm"><Plus size={12} className="inline mr-1" />Agendar</PortalBtn>} />
      <div className="flex border-b border-border mb-5">
        {[{ id: "upcoming", label: "Próximas" }, { id: "past", label: "Histórico" }].map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`px-5 py-2 bg-transparent border-none text-sm font-bold cursor-pointer transition-all -mb-px
              ${tab === tb.id ? "text-text-1 border-b-2 border-primary" : "text-text-3 border-b-2 border-transparent"}`}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {tab === "upcoming" && (
        <div className="flex flex-col gap-4">
          {MEET_UP.map((m) => (
            <PortalCard key={m.id}>
              <button
                onClick={() => setExp(exp === m.id ? null : m.id)}
                className="w-full p-5 flex items-center gap-4 text-left bg-transparent border-none cursor-pointer"
              >
                <span className="w-10 h-10 rounded-lg bg-surface-3 flex items-center justify-center text-text-2">
                  <VideoIcon size={20} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-1">{m.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-text-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {m.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {m.time}</span>
                    <span className="flex items-center gap-1"><VideoIcon size={12} /> {m.via}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {m.owner}</span>
                  </div>
                </div>
                <StatusBadge status="Confirmada" />
                <span className="text-xs text-primary font-bold">Entrar</span>
                {exp === m.id ? <ChevronUp size={16} className="text-text-3" /> : <ChevronDown size={16} className="text-text-3" />}
              </button>
              {exp === m.id && (
                <div className="px-5 pb-5 pt-0 border-t border-border ml-14">
                  <p className="text-[10px] font-bold text-text-3 uppercase tracking-widest my-3">PAUTA</p>
                  {m.agenda.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      <Circle size={6} className="text-primary fill-primary" />
                      <span className="text-xs text-text-2">{a}</span>
                    </div>
                  ))}
                </div>
              )}
            </PortalCard>
          ))}
        </div>
      )}

      {tab === "past" && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {MEET_PAST.map((m) => (
            <div key={m.id} className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-surface-3 transition-colors">
              <span className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center text-text-3">
                <VideoIcon size={16} />
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-text-1">{m.title}</p>
                <p className="text-[11px] text-text-3">{m.date} · {m.via} · {m.dur}</p>
              </div>
              <div className="flex items-center gap-2">
                {m.rec && <Tag label="Gravação" color="#3B82F6" bg="rgba(59,130,246,0.12)" />}
                {m.ata && <Tag label="Ata" color="#22C55E" bg="rgba(34,197,94,0.12)" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
