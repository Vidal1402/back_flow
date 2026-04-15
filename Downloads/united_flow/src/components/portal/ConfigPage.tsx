import { PortalCard, StatusBadge } from "./Primitives";
import { PageHeader } from "./Primitives";

export function ConfigPage() {
  return (
    <div>
      <PageHeader title="Configurações" subtitle="Conta, integrações e preferências" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortalCard>
          <div className="p-5">
            <p className="text-sm font-bold text-text-1 mb-4">Dados da Conta</p>
            {[
              { label: "Empresa", value: "TechVision Ltda." },
              { label: "Responsável", value: "Ricardo Mendes" },
              { label: "Email", value: "ricardo@techvision.com.br" },
              { label: "Telefone", value: "+55 11 98765-4321" },
              { label: "Plano", value: "Growth — R$ 4.800/mês" },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-xs text-text-3">{d.label}</span>
                <span className="text-xs font-semibold text-text-1">{d.value}</span>
              </div>
            ))}
          </div>
        </PortalCard>

        <PortalCard>
          <div className="p-5">
            <p className="text-sm font-bold text-text-1 mb-4">Integrações</p>
            {[
              { name: "Google Analytics", status: "Conectado" },
              { name: "Meta Ads", status: "Conectado" },
              { name: "Google Ads", status: "Conectado" },
              { name: "RD Station", status: "Desconectado" },
              { name: "Slack", status: "Desconectado" },
            ].map((int, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-xs text-text-1 font-medium">{int.name}</span>
                <StatusBadge status={int.status} />
              </div>
            ))}
          </div>
        </PortalCard>

        <PortalCard>
          <div className="p-5">
            <p className="text-sm font-bold text-text-1 mb-4">Notificações</p>
            {[
              { label: "Email — Entregas", on: true },
              { label: "Email — Relatórios", on: true },
              { label: "Email — Faturas", on: true },
              { label: "Push — Atualizações", on: false },
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-xs text-text-2">{n.label}</span>
                <span className={`text-[10px] font-bold ${n.on ? "text-tag-green" : "text-text-4"}`}>
                  {n.on ? "Ativo" : "Inativo"}
                </span>
              </div>
            ))}
          </div>
        </PortalCard>

        <PortalCard>
          <div className="p-5">
            <p className="text-sm font-bold text-text-1 mb-4">Equipe</p>
            {[
              { name: "Ricardo Mendes", role: "Admin", email: "ricardo@techvision.com.br" },
              { name: "Juliana Costa", role: "Viewer", email: "juliana@techvision.com.br" },
            ].map((u, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-xs font-semibold text-text-1">{u.name}</p>
                  <p className="text-[11px] text-text-3">{u.email}</p>
                </div>
                <span className="text-[10px] font-bold text-text-3 bg-surface-3 px-2 py-0.5 rounded">{u.role}</span>
              </div>
            ))}
          </div>
        </PortalCard>
      </div>
    </div>
  );
}
