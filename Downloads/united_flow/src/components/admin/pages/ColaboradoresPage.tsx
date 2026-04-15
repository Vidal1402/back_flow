import { useState } from "react";
import { MOCK_COLABORADORES, FUNCOES_COLABORADOR } from "@/data/admin-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Shield, Paintbrush, Target, Users } from "lucide-react";

const FUNCAO_CONFIG = {
  Gestor: { icon: Users, color: "bg-blue-100 text-blue-700" },
  Designer: { icon: Paintbrush, color: "bg-purple-100 text-purple-700" },
  Tráfego: { icon: Target, color: "bg-amber-100 text-amber-700" },
} as const;

export function ColaboradoresPage() {
  const [search, setSearch] = useState("");
  const [filterFuncao, setFilterFuncao] = useState<string>("todas");

  const filtered = MOCK_COLABORADORES.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.cargo.toLowerCase().includes(search.toLowerCase());
    const matchFuncao = filterFuncao === "todas" || c.funcao === filterFuncao;
    return matchSearch && matchFuncao;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-1">Colaboradores</h1>
          <p className="text-sm text-text-3">{MOCK_COLABORADORES.length} membros da equipe</p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs"><Plus size={14} /> Adicionar</Button>
      </div>

      {/* Function summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {FUNCOES_COLABORADOR.map((funcao) => {
          const count = MOCK_COLABORADORES.filter((c) => c.funcao === funcao).length;
          const config = FUNCAO_CONFIG[funcao];
          const Icon = config.icon;
          return (
            <button
              key={funcao}
              onClick={() => setFilterFuncao(filterFuncao === funcao ? "todas" : funcao)}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                filterFuncao === funcao
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${config.color}`}>
                <Icon size={16} />
              </span>
              <div className="text-left">
                <p className="text-xs font-bold text-text-1">{funcao}</p>
                <p className="text-[11px] text-text-3">{count} colaborador{count !== 1 ? "es" : ""}</p>
              </div>
            </button>
          );
        })}
      </div>

      <Card className="shadow-card">
        <div className="p-4 pb-0">
          <div className="relative max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar colaboradores..." className="pl-9 h-9 text-sm" />
          </div>
        </div>
        <CardContent className="p-0 pt-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Colaborador</TableHead>
                <TableHead className="text-xs hidden lg:table-cell">Função</TableHead>
                <TableHead className="text-xs hidden md:table-cell">Email</TableHead>
                <TableHead className="text-xs hidden sm:table-cell">Tarefas</TableHead>
                <TableHead className="text-xs hidden sm:table-cell">Projetos</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => {
                const funcConfig = FUNCAO_CONFIG[c.funcao];
                const FuncIcon = funcConfig.icon;
                return (
                  <TableRow key={c.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-text-1">{c.name}</p>
                          <p className="text-[11px] text-text-3">{c.cargo}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${funcConfig.color}`}>
                        <FuncIcon size={10} />
                        {c.funcao}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-text-2 hidden md:table-cell">{c.email}</TableCell>
                    <TableCell className="text-xs font-medium text-text-1 hidden sm:table-cell">{c.tarefas}</TableCell>
                    <TableCell className="text-xs font-medium text-text-1 hidden sm:table-cell">{c.projetos}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full capitalize ${
                        c.status === "ativo" ? "bg-tag-green-bg text-tag-green" : "bg-tag-amber-bg text-tag-amber"
                      }`}>{c.status}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <button className="w-7 h-7 rounded-md flex items-center justify-center text-text-3 hover:bg-muted bg-transparent border-none cursor-pointer" title="Permissões"><Shield size={14} /></button>
                        <button className="w-7 h-7 rounded-md flex items-center justify-center text-text-3 hover:bg-muted bg-transparent border-none cursor-pointer" title="Editar"><Edit size={14} /></button>
                        <button className="w-7 h-7 rounded-md flex items-center justify-center text-text-3 hover:text-destructive hover:bg-destructive/10 bg-transparent border-none cursor-pointer" title="Remover"><Trash2 size={14} /></button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
