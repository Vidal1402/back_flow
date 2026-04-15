import { useState } from "react";
import { MOCK_CLIENTS } from "@/data/admin-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, MoreHorizontal, Eye, Edit, Pause, History } from "lucide-react";

export function ClientesPage() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_CLIENTS.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.empresa.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      ativo: "bg-tag-green-bg text-tag-green",
      pausado: "bg-tag-amber-bg text-tag-amber",
      inadimplente: "bg-tag-red-bg text-tag-red",
    };
    return map[s] || "";
  };

  const planBadge = (p: string) => {
    const map: Record<string, string> = {
      Starter: "bg-muted text-text-2",
      Growth: "bg-tag-blue-bg text-tag-blue",
      Pro: "bg-tag-purple-bg text-tag-purple",
      Scale: "bg-tag-amber-bg text-tag-amber",
    };
    return map[p] || "";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-1">Clientes</h1>
          <p className="text-sm text-text-3">{MOCK_CLIENTS.length} clientes cadastrados</p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs"><Plus size={14} /> Novo Cliente</Button>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar clientes..." className="pl-9 h-9 text-sm" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Cliente</TableHead>
                <TableHead className="text-xs hidden md:table-cell">Email</TableHead>
                <TableHead className="text-xs">Plano</TableHead>
                <TableHead className="text-xs hidden sm:table-cell">Valor</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div>
                      <p className="text-xs font-semibold text-text-1">{c.name}</p>
                      <p className="text-[11px] text-text-3">{c.empresa}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-text-2 hidden md:table-cell">{c.email}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${planBadge(c.plano)}`}>{c.plano}</span>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-text-1 hidden sm:table-cell">R$ {c.valor.toLocaleString("pt-BR")}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full capitalize ${statusBadge(c.status)}`}>{c.status}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded-md flex items-center justify-center text-text-3 hover:bg-muted bg-transparent border-none cursor-pointer" title="Ver">
                        <Eye size={14} />
                      </button>
                      <button className="w-7 h-7 rounded-md flex items-center justify-center text-text-3 hover:bg-muted bg-transparent border-none cursor-pointer" title="Editar">
                        <Edit size={14} />
                      </button>
                    </div>
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
