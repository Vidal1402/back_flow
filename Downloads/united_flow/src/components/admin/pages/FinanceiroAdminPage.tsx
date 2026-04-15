import { MOCK_FINANCEIRO, FATURAMENTO_MENSAL } from "@/data/admin-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, Download, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const totalFaturado = MOCK_FINANCEIRO.reduce((a, b) => a + b.valor, 0);
const totalRecebido = MOCK_FINANCEIRO.filter(f => f.status === "pago").reduce((a, b) => a + b.valor, 0);
const totalPendente = MOCK_FINANCEIRO.filter(f => f.status === "pendente").reduce((a, b) => a + b.valor, 0);
const totalVencido = MOCK_FINANCEIRO.filter(f => f.status === "vencido").reduce((a, b) => a + b.valor, 0);

const finCards = [
  { label: "Faturamento", value: `R$ ${(totalFaturado/1000).toFixed(1)}k`, icon: DollarSign, color: "text-tag-blue", bg: "bg-tag-blue-bg" },
  { label: "Recebido", value: `R$ ${(totalRecebido/1000).toFixed(1)}k`, icon: CheckCircle, color: "text-tag-green", bg: "bg-tag-green-bg" },
  { label: "A Receber", value: `R$ ${(totalPendente/1000).toFixed(1)}k`, icon: TrendingUp, color: "text-tag-amber", bg: "bg-tag-amber-bg" },
  { label: "Vencido", value: `R$ ${(totalVencido/1000).toFixed(1)}k`, icon: AlertTriangle, color: "text-tag-red", bg: "bg-tag-red-bg" },
];

export function FinanceiroAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-1">Financeiro</h1>
          <p className="text-sm text-text-3">Controle de faturamento e cobranças</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs"><Download size={14} /> Exportar</Button>
          <Button size="sm" className="gap-1.5 text-xs"><Plus size={14} /> Nova Cobrança</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {finCards.map((c) => (
          <Card key={c.label} className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <span className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                <c.icon size={20} className={c.color} />
              </span>
              <div>
                <p className="text-[10px] text-text-3 uppercase tracking-wider font-medium">{c.label}</p>
                <p className="text-lg font-bold text-text-1">{c.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-1">Faturamento vs Recebido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FATURAMENTO_MENSAL}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--text-3))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--text-3))" }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="faturado" name="Faturado" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="recebido" name="Recebido" fill="hsl(var(--green))" radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-1">Faturas Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Cliente</TableHead>
                <TableHead className="text-xs">Valor</TableHead>
                <TableHead className="text-xs hidden sm:table-cell">Vencimento</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_FINANCEIRO.map((f) => (
                <TableRow key={f.id} className="hover:bg-muted/30">
                  <TableCell className="text-xs font-medium text-text-1">{f.cliente}</TableCell>
                  <TableCell className="text-xs font-bold text-text-1">R$ {f.valor.toLocaleString("pt-BR")}</TableCell>
                  <TableCell className="text-xs text-text-2 hidden sm:table-cell">{new Date(f.vencimento).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full capitalize ${
                      f.status === "pago" ? "bg-tag-green-bg text-tag-green" :
                      f.status === "pendente" ? "bg-tag-amber-bg text-tag-amber" :
                      "bg-tag-red-bg text-tag-red"
                    }`}>{f.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
