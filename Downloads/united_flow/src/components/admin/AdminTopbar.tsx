import { Bell, Plus, Download, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onMenuClick: () => void;
}

export function AdminTopbar({ onMenuClick }: Props) {
  return (
    <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border px-4 md:px-6 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-2 hover:bg-muted bg-transparent border border-border cursor-pointer md:hidden"
        >
          <Menu size={18} />
        </button>
        <div className="hidden sm:flex items-center gap-4">
          <Stat label="MRR" value="R$ 87.4k" />
          <div className="w-px h-6 bg-border" />
          <Stat label="Clientes" value="142" />
          <div className="w-px h-6 bg-border" />
          <Stat label="A Receber" value="R$ 32.8k" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="hidden sm:flex gap-1.5 text-xs">
          <Download size={14} /> Exportar
        </Button>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus size={14} /> Novo Cliente
        </Button>
        <button className="relative w-8 h-8 rounded-full flex items-center justify-center text-text-2 hover:bg-muted bg-transparent border border-border cursor-pointer">
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">4</span>
        </button>
        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary cursor-pointer">AD</span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-text-3 uppercase tracking-wider font-medium">{label}</p>
      <p className="text-sm font-bold text-text-1">{value}</p>
    </div>
  );
}
