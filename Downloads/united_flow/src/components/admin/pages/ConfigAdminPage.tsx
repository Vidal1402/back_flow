import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Building, Mail, Shield, Bell, Palette } from "lucide-react";

export function ConfigAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-1">Configurações</h1>
        <p className="text-sm text-text-3">Preferências do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-text-1 flex items-center gap-2">
              <Building size={16} className="text-primary" /> Dados da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Nome da Empresa</Label>
              <Input defaultValue="United Agency" className="h-9 text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">CNPJ</Label>
              <Input defaultValue="12.345.678/0001-90" className="h-9 text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Email de Contato</Label>
              <Input defaultValue="contato@united.com" className="h-9 text-sm" />
            </div>
            <Button size="sm" className="text-xs">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-text-1 flex items-center gap-2">
              <Shield size={16} className="text-primary" /> Permissões
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { role: "Super Admin", desc: "Acesso total ao sistema" },
              { role: "Admin", desc: "Clientes, produção e colaboradores" },
              { role: "Colaborador", desc: "Apenas tarefas atribuídas" },
            ].map((p) => (
              <div key={p.role} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                <div>
                  <p className="text-xs font-semibold text-text-1">{p.role}</p>
                  <p className="text-[10px] text-text-3">{p.desc}</p>
                </div>
                <Button size="sm" variant="outline" className="text-[10px] h-7">Gerenciar</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-text-1 flex items-center gap-2">
              <Bell size={16} className="text-primary" /> Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Email para faturas vencidas", enabled: true },
              { label: "Alerta de tarefas atrasadas", enabled: true },
              { label: "Novo cliente cadastrado", enabled: false },
              { label: "Resumo semanal", enabled: true },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between">
                <span className="text-xs text-text-2">{n.label}</span>
                <Switch defaultChecked={n.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-text-1 flex items-center gap-2">
              <Palette size={16} className="text-primary" /> Aparência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-2">Tema</span>
              <span className="text-xs font-medium text-text-1 bg-muted px-3 py-1 rounded-full">Light Mode</span>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Logo da Empresa</Label>
              <div className="h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-xs text-text-3 cursor-pointer hover:bg-muted/30">
                Clique para enviar
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
