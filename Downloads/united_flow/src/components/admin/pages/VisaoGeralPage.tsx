import { METRIC_CARDS, MRR_CHART_DATA, PLAN_DISTRIBUTION, CLIENT_STATUS, MOCK_ALERTAS } from "@/data/admin-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

export function VisaoGeralPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-1">Visão Geral</h1>
        <p className="text-sm text-text-3">Resumo executivo do seu negócio</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {METRIC_CARDS.map((m) => (
          <Card key={m.label} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-4">
              <p className="text-xs text-text-3 font-medium mb-1">{m.label}</p>
              <p className="text-xl font-bold text-text-1">{m.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {m.trend === "up" && m.label !== "Valores Vencidos" && m.label !== "Churn Rate" && (
                  <>
                    <ArrowUpRight size={14} className="text-tag-green" />
                    <span className="text-xs font-medium text-tag-green">+{m.change}%</span>
                  </>
                )}
                {m.trend === "up" && (m.label === "Valores Vencidos") && (
                  <>
                    <ArrowUpRight size={14} className="text-tag-red" />
                    <span className="text-xs font-medium text-tag-red">+{m.change}%</span>
                  </>
                )}
                {m.trend === "down" && m.label === "Churn Rate" && (
                  <>
                    <ArrowDownRight size={14} className="text-tag-green" />
                    <span className="text-xs font-medium text-tag-green">{m.change}%</span>
                  </>
                )}
                {m.trend === "neutral" && (
                  <>
                    <Minus size={14} className="text-text-3" />
                    <span className="text-xs font-medium text-text-3">0%</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* MRR Chart */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-1">MRR por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MRR_CHART_DATA}>
                  <defs>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--text-3))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--text-3))" }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "MRR"]} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#mrrGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-1">Distribuição de Planos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PLAN_DISTRIBUTION} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--text-3))" }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--text-2))" }} width={60} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                    {PLAN_DISTRIBUTION.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Client Status */}
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-text-2">Status dos Clientes</p>
              {CLIENT_STATUS.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                    <span className="text-xs text-text-2">{s.name}</span>
                  </div>
                  <span className="text-xs font-bold text-text-1">{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-1 flex items-center gap-2">
              <AlertTriangle size={16} className="text-tag-amber" /> Alertas Ativos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {MOCK_ALERTAS.slice(0, 4).map((a) => (
              <div key={a.id} className={`flex items-start gap-3 p-3 rounded-lg border ${
                a.severidade === "alta" ? "border-tag-red/20 bg-tag-red-bg" :
                a.severidade === "media" ? "border-tag-amber/20 bg-tag-amber-bg" :
                "border-border bg-muted/30"
              }`}>
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  a.severidade === "alta" ? "bg-tag-red" : a.severidade === "media" ? "bg-tag-amber" : "bg-tag-blue"
                }`} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-text-1">{a.titulo}</p>
                  <p className="text-[11px] text-text-3">{a.descricao}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-1">Próximos Vencimentos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { cliente: "TechVision Ltda.", valor: "R$ 1.200", data: "15/12/2024", dias: 5 },
              { cliente: "BA Tech Solutions", valor: "R$ 400", data: "15/12/2024", dias: 5 },
              { cliente: "Studio Design Co.", valor: "R$ 800", data: "10/12/2024", dias: 0 },
              { cliente: "FO Arquitetura", valor: "R$ 1.200", data: "20/12/2024", dias: 10 },
            ].map((v, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                <div>
                  <p className="text-xs font-semibold text-text-1">{v.cliente}</p>
                  <p className="text-[11px] text-text-3">Vencimento: {v.data}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-text-1">{v.valor}</p>
                  <p className={`text-[10px] font-medium ${v.dias <= 3 ? "text-tag-red" : "text-text-3"}`}>
                    {v.dias === 0 ? "Hoje" : `em ${v.dias} dias`}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
