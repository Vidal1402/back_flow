import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BarChart3, Users, Package } from "lucide-react";
import { MRR_CHART_DATA, FATURAMENTO_MENSAL } from "@/data/admin-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const REPORTS = [
  { id: "1", nome: "Faturamento Mensal", desc: "Resumo de receitas por mês", icon: BarChart3 },
  { id: "2", nome: "Crescimento de Clientes", desc: "Novos clientes e churn", icon: Users },
  { id: "3", nome: "Produtividade da Equipe", desc: "Tarefas concluídas por colaborador", icon: Package },
  { id: "4", nome: "Volume de Produção", desc: "Entregas por tipo e período", icon: FileText },
];

export function RelatoriosAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-1">Relatórios</h1>
        <p className="text-sm text-text-3">Análises e exportações</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REPORTS.map((r) => (
          <Card key={r.id} className="shadow-card hover:shadow-card-hover transition-all cursor-pointer">
            <CardContent className="p-5 space-y-3">
              <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <r.icon size={20} className="text-primary" />
              </span>
              <div>
                <p className="text-sm font-semibold text-text-1">{r.nome}</p>
                <p className="text-[11px] text-text-3">{r.desc}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-[10px] h-7 px-2 gap-1">
                  <Download size={12} /> PDF
                </Button>
                <Button size="sm" variant="outline" className="text-[10px] h-7 px-2 gap-1">
                  <Download size={12} /> CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-1">Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MRR_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--text-3))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--text-3))" }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-1">Faturado vs Recebido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FATURAMENTO_MENSAL}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--text-3))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--text-3))" }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="faturado" name="Faturado" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="recebido" name="Recebido" fill="hsl(var(--green))" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
