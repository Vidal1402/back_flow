import { useState } from "react";
import { CreditCard, QrCode, FileText, Layers, CheckCircle, Copy, Clock, ArrowRight, Shield, Wallet, TrendingUp, AlertCircle } from "lucide-react";
import { INVOICES } from "@/data/portal-data";
import { PageHeader, PortalCard, StatusBadge, FilterDropdown } from "./Primitives";

const PAYMENT_ICONS: Record<string, React.ReactNode> = {
  "Todos": <Layers size={14} />,
  "Cartão de Crédito": <CreditCard size={14} />,
  "Boleto": <FileText size={14} />,
  "Pix": <QrCode size={14} />,
};

const PAYMENT_METHODS = ["Todos", "Cartão de Crédito", "Boleto", "Pix"];

const PAY_OPTIONS = [
  { id: "Pix", label: "Pix", desc: "Aprovação instantânea", Icon: QrCode, color: "#22C55E" },
  { id: "Cartão de Crédito", label: "Cartão", desc: "Crédito ou débito", Icon: CreditCard, color: "hsl(var(--primary))" },
  { id: "Boleto", label: "Boleto", desc: "Até 3 dias úteis", Icon: FileText, color: "#F59E0B" },
];

const KPI_DATA = [
  { label: "Plano Atual", value: "Growth", sub: "R$ 4.800/mês", icon: Wallet, color: "hsl(var(--primary))" },
  { label: "Próx. Vencimento", value: "15 Mar", sub: "Em 11 dias", icon: Clock, color: "#F59E0B" },
  { label: "Em Aberto", value: "R$ 4.800", sub: "1 fatura pendente", icon: AlertCircle, color: "#EF4444" },
  { label: "Status", value: "Em dia", sub: "Sem pendências", icon: TrendingUp, color: "#22C55E" },
];

function PaymentMethodDetails({ method }: { method: string }) {
  if (method === "Pix") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text-1">Chave Pix</p>
          <button className="flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/8 px-3 py-1.5 rounded-lg border-none cursor-pointer hover:bg-primary/12 transition-colors">
            <Copy size={12} /> Copiar chave
          </button>
        </div>
        <div className="bg-background rounded-xl p-6 flex items-center justify-center">
          <div className="w-36 h-36 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm">
            <QrCode size={64} className="text-text-3" />
          </div>
        </div>
        <p className="text-xs text-text-3 text-center">Escaneie o QR Code ou copie a chave para pagar</p>
      </div>
    );
  }

  if (method === "Cartão de Crédito") {
    return (
      <div className="space-y-4">
        <p className="text-sm font-semibold text-text-1">Dados do cartão</p>
        <div>
          <label className="text-[11px] font-medium text-text-3 block mb-1.5">Número do cartão</label>
          <div className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-2 flex items-center gap-2.5">
            <CreditCard size={16} className="text-text-3" />
            •••• •••• •••• 4832
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-medium text-text-3 block mb-1.5">Validade</label>
            <div className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-2">08/27</div>
          </div>
          <div>
            <label className="text-[11px] font-medium text-text-3 block mb-1.5">CVV</label>
            <div className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-2">•••</div>
          </div>
        </div>
      </div>
    );
  }

  if (method === "Boleto") {
    return (
      <div className="space-y-4">
        <p className="text-sm font-semibold text-text-1">Boleto Bancário</p>
        <p className="text-xs text-text-3">Um boleto será gerado para pagamento em até 3 dias úteis.</p>
        <div className="bg-background border border-border rounded-xl p-4 flex items-center justify-between gap-3">
          <span className="text-xs text-text-2 font-mono truncate">23793.38128 60000.000003 00000.000408 1 84340000480000</span>
          <button className="flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/8 px-3 py-1.5 rounded-lg border-none cursor-pointer hover:bg-primary/12 transition-colors shrink-0">
            <Copy size={12} /> Copiar
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export function FinanceiroPage() {
  const [payMethod, setPayMethod] = useState("Todos");
  const [selectedPay, setSelectedPay] = useState("Pix");
  const [paid, setPaid] = useState(false);

  const filtered = payMethod === "Todos"
    ? INVOICES
    : INVOICES.filter((inv) => inv.method === payMethod);

  return (
    <div>
      <PageHeader title="Financeiro" subtitle="Faturas, pagamentos e plano" />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {KPI_DATA.map((s, i) => (
          <PortalCard key={i}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] text-text-3 font-medium">{s.label}</p>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12` }}>
                  <s.icon size={16} style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-xl font-bold text-text-1">{s.value}</p>
              <p className="text-[11px] text-text-3 mt-1">{s.sub}</p>
            </div>
          </PortalCard>
        ))}
      </div>

      {/* ── Seção Pagar Fatura ── */}
      <div className="mb-8">
        <p className="text-[10px] font-bold text-text-3 uppercase tracking-widest mb-4">PAGAR FATURA</p>

        {paid ? (
          <PortalCard>
            <div className="p-10 text-center">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-[rgba(34,197,94,0.1)] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-[#22C55E]" />
                </div>
                <p className="text-lg font-bold text-text-1 mb-1">Pagamento enviado!</p>
                <p className="text-sm text-text-3 mb-6">
                  {selectedPay === "Pix" ? "Aguardando confirmação do Pix" : selectedPay === "Boleto" ? "Boleto gerado com sucesso" : "Processando pagamento"}
                </p>
                <button
                  onClick={() => setPaid(false)}
                  className="text-xs text-primary font-semibold bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 cursor-pointer hover:bg-primary/15 transition-all"
                >
                  ← Voltar para faturas
                </button>
              </div>
            </div>
          </PortalCard>
        ) : (
          <PortalCard>
            <div className="p-0">
              <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-1">FAT-2025-03 · Março 2025</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(245,158,11,0.12)] text-[#F59E0B]">Pendente</span>
                      <span className="text-[11px] text-text-3 flex items-center gap-1"><Clock size={10} /> Vence em 15 Mar</span>
                    </div>
                  </div>
                </div>
                <div className="text-right sm:text-right">
                  <p className="text-2xl font-bold text-text-1">R$ 4.800<span className="text-sm font-medium text-text-3">,00</span></p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
                <div className="lg:col-span-4 p-5">
                  <p className="text-[11px] font-semibold text-text-3 uppercase tracking-wider mb-3">Método de pagamento</p>
                  <div className="space-y-2">
                    {PAY_OPTIONS.map((m) => {
                      const isActive = selectedPay === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setSelectedPay(m.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 bg-transparent text-left
                            ${isActive
                              ? "border-2 border-primary bg-primary/5 shadow-sm"
                              : "border border-border hover:border-border-strong hover:bg-surface-3"
                            }`}
                        >
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: isActive ? `${m.color}18` : "hsl(var(--surface-3))" }}
                          >
                            <m.Icon size={18} style={{ color: isActive ? m.color : "hsl(var(--text-3))" }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold ${isActive ? "text-text-1" : "text-text-2"}`}>{m.label}</p>
                            <p className="text-[10px] text-text-3">{m.desc}</p>
                          </div>
                          {isActive && (
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                              <CheckCircle size={12} className="text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-8 p-5 flex flex-col">
                  <p className="text-[11px] font-semibold text-text-3 uppercase tracking-wider mb-3">Detalhes do pagamento</p>
                  
                  <div className="bg-surface-3/50 rounded-xl p-5 mb-5 flex-1">
                    <PaymentMethodDetails method={selectedPay} />
                  </div>

                  <div className="bg-surface-3/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs text-text-3">Plano Growth · Março 2025</span>
                      <span className="text-xs text-text-2">R$ 4.800,00</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm font-bold text-text-1">Total</span>
                      <span className="text-lg font-bold text-text-1">R$ 4.800,00</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setPaid(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold cursor-pointer border-none transition-all hover:opacity-90 shadow-sm"
                  >
                    {selectedPay === "Boleto" ? "Gerar Boleto" : selectedPay === "Pix" ? "Confirmar Pix" : "Pagar R$ 4.800,00"}
                    <ArrowRight size={16} />
                  </button>

                  <p className="text-[10px] text-text-4 text-center mt-3 flex items-center justify-center gap-1">
                    <Shield size={10} /> Pagamento seguro e criptografado
                  </p>
                </div>
              </div>
            </div>
          </PortalCard>
        )}
      </div>

      {/* ── Tabela de Faturas ── */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold text-text-3 uppercase tracking-widest">HISTÓRICO DE FATURAS</p>
        <FilterDropdown
          options={PAYMENT_METHODS}
          active={payMethod}
          onChange={setPayMethod}
          label="Pagamento"
          icon={<CreditCard size={14} />}
          icons={PAYMENT_ICONS}
        />
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 px-5 py-3 border-b border-border text-[11px] font-semibold text-text-3 uppercase tracking-wider">
          <span>Fatura</span>
          <span>Período</span>
          <span>Valor</span>
          <span>Vencimento</span>
          <span>Status</span>
          <span>Método</span>
          <span>Pagamento</span>
        </div>
        {filtered.map((inv) => (
          <div key={inv.id} className="grid grid-cols-7 px-5 py-3 border-b border-border last:border-0 items-center hover:bg-surface-3 transition-colors">
            <span className="text-xs font-semibold text-text-1">{inv.id}</span>
            <span className="text-xs text-text-2">{inv.period}</span>
            <span className="text-xs font-semibold text-text-1">{inv.value}</span>
            <span className="text-xs text-text-3">{inv.due}</span>
            <StatusBadge status={inv.status} />
            <span className="text-xs text-text-2 flex items-center gap-1.5">
              {PAYMENT_ICONS[inv.method || ""] || <CreditCard size={12} />}
              {inv.method || "—"}
            </span>
            <span className="text-xs text-text-3">{inv.paid || "—"}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-text-4 text-center py-6">Nenhuma fatura encontrada</p>
        )}
      </div>
    </div>
  );
}
