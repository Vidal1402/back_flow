import { MOCK_FUNIL } from "@/data/admin-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, User, DollarSign } from "lucide-react";

const ETAPAS = ["Lead", "Contato", "Proposta", "Negociação", "Fechado"];
const ETAPA_COLORS: Record<string, string> = {
  Lead: "bg-muted text-text-2",
  Contato: "bg-tag-blue-bg text-tag-blue",
  Proposta: "bg-tag-purple-bg text-tag-purple",
  "Negociação": "bg-tag-amber-bg text-tag-amber",
  Fechado: "bg-tag-green-bg text-tag-green",
};

export function ComercialPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-1">Comercial</h1>
          <p className="text-sm text-text-3">Funil de vendas</p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs"><Plus size={14} /> Nova Oportunidade</Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {ETAPAS.map((etapa) => {
          const items = MOCK_FUNIL.filter(f => f.etapa === etapa);
          const total = items.reduce((a, b) => a + b.valor, 0);
          return (
            <div key={etapa} className="flex-shrink-0 w-[260px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-text-1 uppercase tracking-wider">{etapa}</h3>
                  <span className="text-[10px] font-bold bg-muted text-text-2 w-5 h-5 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-text-3">R$ {(total/1000).toFixed(1)}k</span>
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <Card key={item.id} className="shadow-card hover:shadow-card-hover transition-all cursor-pointer">
                    <CardContent className="p-3 space-y-2">
                      <p className="text-xs font-semibold text-text-1">{item.empresa}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-text-2">
                          <DollarSign size={12} />
                          <span className="text-xs font-bold">R$ {item.valor.toLocaleString("pt-BR")}</span>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${ETAPA_COLORS[item.etapa]}`}>
                          {item.probabilidade}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-text-3">
                        <User size={12} />
                        <span className="text-[10px]">{item.responsavel}</span>
                      </div>
                      {/* Probability bar */}
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${item.probabilidade}%`,
                            background: item.probabilidade >= 70 ? "hsl(var(--green))" : item.probabilidade >= 40 ? "hsl(var(--amber))" : "hsl(var(--red))"
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {items.length === 0 && (
                  <div className="p-4 text-center text-xs text-text-3 border border-dashed border-border rounded-lg">
                    Nenhuma oportunidade
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
