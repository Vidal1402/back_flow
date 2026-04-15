import { MOCK_PLANOS } from "@/data/admin-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Users, Edit } from "lucide-react";

const PLAN_COLORS = ["border-tag-blue/30", "border-tag-green/30", "border-tag-purple/30", "border-tag-amber/30"];
const PLAN_ACCENTS = ["text-tag-blue", "text-tag-green", "text-tag-purple", "text-tag-amber"];

export function ProdutosPlanosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-1">Produtos / Planos</h1>
          <p className="text-sm text-text-3">Gerencie os planos oferecidos</p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">+ Novo Plano</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_PLANOS.map((p, i) => (
          <Card key={p.id} className={`shadow-card hover:shadow-card-hover transition-all border-2 ${PLAN_COLORS[i]}`}>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold ${PLAN_ACCENTS[i]}`}>{p.nome}</h3>
                <button className="w-7 h-7 rounded-md flex items-center justify-center text-text-3 hover:bg-muted bg-transparent border-none cursor-pointer">
                  <Edit size={14} />
                </button>
              </div>
              <div>
                <span className="text-2xl font-bold text-text-1">R$ {p.valor.toLocaleString("pt-BR")}</span>
                <span className="text-xs text-text-3">/mês</span>
              </div>
              <div className="flex items-center gap-1.5 text-text-2">
                <Users size={14} />
                <span className="text-xs font-medium">{p.clientes} clientes</span>
              </div>
              <div className="space-y-2 pt-2 border-t border-border">
                {p.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <Check size={14} className={PLAN_ACCENTS[i]} />
                    <span className="text-xs text-text-2">{f}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
