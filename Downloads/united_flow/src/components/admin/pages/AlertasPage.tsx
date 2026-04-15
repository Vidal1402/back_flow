import { MOCK_ALERTAS } from "@/data/admin-data";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, CreditCard, FileWarning, CheckCircle } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  inadimplente: CreditCard,
  atraso: Clock,
  vencimento: FileWarning,
};

export function AlertasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-1">Alertas</h1>
        <p className="text-sm text-text-3">{MOCK_ALERTAS.length} alertas ativos</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Alta", count: MOCK_ALERTAS.filter(a => a.severidade === "alta").length, color: "text-tag-red", bg: "bg-tag-red-bg" },
          { label: "Média", count: MOCK_ALERTAS.filter(a => a.severidade === "media").length, color: "text-tag-amber", bg: "bg-tag-amber-bg" },
          { label: "Baixa", count: MOCK_ALERTAS.filter(a => a.severidade === "baixa").length, color: "text-tag-green", bg: "bg-tag-green-bg" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-text-1">{s.count}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.color}`}>{s.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {MOCK_ALERTAS.map((a) => {
          const Icon = ICON_MAP[a.tipo] || AlertTriangle;
          return (
            <Card key={a.id} className={`shadow-card border-l-4 ${
              a.severidade === "alta" ? "border-l-tag-red" : a.severidade === "media" ? "border-l-tag-amber" : "border-l-tag-green"
            }`}>
              <CardContent className="p-4 flex items-center gap-4">
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  a.severidade === "alta" ? "bg-tag-red-bg" : a.severidade === "media" ? "bg-tag-amber-bg" : "bg-tag-green-bg"
                }`}>
                  <Icon size={18} className={
                    a.severidade === "alta" ? "text-tag-red" : a.severidade === "media" ? "text-tag-amber" : "text-tag-green"
                  } />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-1">{a.titulo}</p>
                  <p className="text-xs text-text-3">{a.descricao}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-text-3">{new Date(a.data).toLocaleDateString("pt-BR")}</p>
                  <button className="mt-1 w-7 h-7 rounded-md flex items-center justify-center text-tag-green hover:bg-tag-green-bg bg-transparent border-none cursor-pointer" title="Resolver">
                    <CheckCircle size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
