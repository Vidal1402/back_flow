import { ArrowRight, Shield, Zap, Crown, Rocket, Star, Check, X as XIcon } from "lucide-react";
import { PageHeader, PortalCard } from "./Primitives";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 2.400",
    period: "/mês",
    desc: "Ideal para quem está começando",
    Icon: Zap,
    color: "#3B82F6",
    popular: false,
    current: false,
    features: [
      { text: "5 entregas/mês", included: true },
      { text: "1 reunião mensal", included: true },
      { text: "Suporte por email", included: true },
      { text: "Relatório mensal", included: true },
      { text: "Estratégia dedicada", included: false },
      { text: "Prioridade de produção", included: false },
      { text: "Academy completa", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "R$ 4.800",
    period: "/mês",
    desc: "Para negócios em crescimento",
    Icon: Rocket,
    color: "hsl(var(--primary))",
    popular: false,
    current: true,
    features: [
      { text: "15 entregas/mês", included: true },
      { text: "2 reuniões mensais", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Relatórios semanais", included: true },
      { text: "Estratégia dedicada", included: true },
      { text: "Prioridade de produção", included: false },
      { text: "Academy completa", included: false },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: "R$ 8.500",
    period: "/mês",
    desc: "Para empresas que precisam escalar",
    Icon: Crown,
    color: "#F59E0B",
    popular: true,
    current: false,
    features: [
      { text: "Entregas ilimitadas", included: true },
      { text: "Reuniões semanais", included: true },
      { text: "Suporte 24/7", included: true },
      { text: "Relatórios em tempo real", included: true },
      { text: "Estratégia dedicada", included: true },
      { text: "Prioridade de produção", included: true },
      { text: "Academy completa", included: true },
    ],
  },
];

export function PlanosPage() {
  return (
    <div>
      <PageHeader title="Planos" subtitle="Compare os planos e escolha o melhor para o seu negócio" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border-2 transition-all ${
              plan.current
                ? "border-primary bg-primary/[0.03] shadow-md"
                : plan.popular
                ? "border-[#F59E0B]/40 bg-[rgba(245,158,11,0.02)]"
                : "border-border bg-card hover:border-border-strong"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#F59E0B] text-[10px] font-bold text-black flex items-center gap-1">
                <Star size={10} /> RECOMENDADO
              </div>
            )}
            {plan.current && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                PLANO ATUAL
              </div>
            )}

            <div className="p-6 pt-8">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${plan.color}15` }}>
                  <plan.Icon size={20} style={{ color: plan.color }} />
                </div>
                <div>
                  <p className="text-base font-bold text-text-1">{plan.name}</p>
                  <p className="text-[11px] text-text-3">{plan.desc}</p>
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-extrabold text-text-1">{plan.price}</span>
                <span className="text-sm text-text-3">{plan.period}</span>
              </div>

              <div className="space-y-2.5 mb-6">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    {f.included ? (
                      <div className="w-5 h-5 rounded-full bg-[rgba(34,197,94,0.12)] flex items-center justify-center shrink-0">
                        <Check size={12} className="text-[#22C55E]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-surface-3 flex items-center justify-center shrink-0">
                        <XIcon size={10} className="text-text-4" />
                      </div>
                    )}
                    <span className={`text-xs ${f.included ? "text-text-2" : "text-text-4"}`}>{f.text}</span>
                  </div>
                ))}
              </div>

              {plan.current ? (
                <div className="w-full py-3 rounded-xl bg-surface-3 text-center text-xs font-bold text-text-3 border border-border">
                  Plano ativo
                </div>
              ) : (
                <button
                  className={`w-full py-3 rounded-xl text-xs font-bold cursor-pointer border-none transition-all hover:opacity-90 ${
                    plan.popular
                      ? "bg-[#F59E0B] text-black shadow-sm"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {plan.price === "R$ 2.400" ? "Fazer downgrade" : "Fazer upgrade"}
                  <ArrowRight size={14} className="inline ml-1.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <PortalCard>
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Shield size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-text-1 mb-1">Precisa de um plano personalizado?</p>
              <p className="text-xs text-text-3">Fale com nosso time para montar um plano sob medida para a sua operação.</p>
              <button className="mt-3 text-xs font-semibold text-primary bg-primary/8 px-4 py-2 rounded-lg border-none cursor-pointer hover:bg-primary/12 transition-colors">
                Falar com consultor →
              </button>
            </div>
          </div>
        </div>
      </PortalCard>
    </div>
  );
}
