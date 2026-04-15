import { useState } from "react";
import { MOCK_KANBAN_ADMIN } from "@/data/admin-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Paperclip, Clock, User } from "lucide-react";

const PRIORITY_COLORS: Record<string, string> = {
  alta: "bg-tag-red-bg text-tag-red",
  media: "bg-tag-amber-bg text-tag-amber",
  baixa: "bg-tag-green-bg text-tag-green",
};

const TIPO_COLORS: Record<string, string> = {
  "Landing Page": "bg-tag-blue-bg text-tag-blue",
  Criativo: "bg-tag-purple-bg text-tag-purple",
  Automação: "bg-tag-cyan-bg text-tag-cyan",
  Campanha: "bg-tag-orange-bg text-tag-orange",
  Vídeo: "bg-tag-pink-bg text-tag-pink",
  Funil: "bg-tag-green-bg text-tag-green",
  Estratégia: "bg-tag-amber-bg text-tag-amber",
  Relatório: "bg-muted text-text-2",
};

export function ProducaoAdminPage() {
  const [columns] = useState(MOCK_KANBAN_ADMIN);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-1">Produção</h1>
        <p className="text-sm text-text-3">Gestão de entregas e tarefas</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.id} className="flex-shrink-0 w-[280px]">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-text-1 uppercase tracking-wider">{col.title}</h3>
                <span className="text-[10px] font-bold bg-muted text-text-2 w-5 h-5 rounded-full flex items-center justify-center">
                  {col.cards.length}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {col.cards.map((card) => (
                <Card key={card.id} className="shadow-card hover:shadow-card-hover transition-all cursor-pointer">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${TIPO_COLORS[card.tipo] || "bg-muted text-text-2"}`}>
                        {card.tipo}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[card.prioridade]}`}>
                        {card.prioridade}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-text-1 leading-snug">{card.title}</p>
                    <p className="text-[11px] text-text-3">{card.cliente}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-border">
                      <div className="flex items-center gap-1.5 text-text-3">
                        <User size={12} />
                        <span className="text-[10px]">{card.responsavel.split(" ")[0]}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-3">
                        <div className="flex items-center gap-0.5">
                          <Clock size={11} />
                          <span className="text-[10px]">{new Date(card.prazo).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                        </div>
                        {card.comentarios > 0 && (
                          <div className="flex items-center gap-0.5">
                            <MessageSquare size={11} />
                            <span className="text-[10px]">{card.comentarios}</span>
                          </div>
                        )}
                        {card.anexos > 0 && (
                          <div className="flex items-center gap-0.5">
                            <Paperclip size={11} />
                            <span className="text-[10px]">{card.anexos}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
