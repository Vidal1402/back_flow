import { useState } from "react";
import {
  Search, FileIcon, Eye, ExternalLink, Download, Upload, ArrowLeft,
  Palette, Megaphone, Diamond, Play, FileText, PieChart,
} from "lucide-react";
import { MAT_FOLDERS, FILES } from "@/data/portal-data";
import { PageHeader, PortalBtn, PortalCard } from "./Primitives";

const FOLDER_ICONS: Record<string, React.ReactNode> = {
  Palette: <Palette size={20} />,
  Megaphone: <Megaphone size={20} />,
  Diamond: <Diamond size={20} />,
  Play: <Play size={20} />,
  FileText: <FileText size={20} />,
  PieChart: <PieChart size={20} />,
};

function FileRow({ f }: { f: { name: string; ext: string; size: string; date: string } }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-surface-3 transition-colors cursor-pointer">
      <FileIcon size={18} className="text-text-3 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-text-1 truncate">{f.name}</p>
        <p className="text-[11px] text-text-3">{f.ext} · {f.size} · {f.date}</p>
      </div>
      <div className="flex items-center gap-2 text-text-3">
        <button className="hover:text-text-1 cursor-pointer bg-transparent border-none"><Eye size={16} /></button>
        <button className="hover:text-text-1 cursor-pointer bg-transparent border-none"><ExternalLink size={16} /></button>
        <button className="hover:text-text-1 cursor-pointer bg-transparent border-none"><Download size={16} /></button>
      </div>
    </div>
  );
}

export function MateriaisPage() {
  const [folder, setFolder] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const fdata = MAT_FOLDERS.find((f) => f.id === folder);
  const files = folder ? (FILES[folder] || []).filter((f) => f.name.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <div>
      <PageHeader title="Materiais" subtitle="Arquivos, criativos e documentos" action={<PortalBtn size="sm"><Upload size={12} className="inline mr-1" />Enviar Arquivo</PortalBtn>} />

      {!folder ? (
        <>
          <div className="relative mb-5">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3" />
            <input
              className="w-full pl-9 pr-4 py-2.5 bg-surface-3 border border-border rounded-lg text-text-1 text-sm outline-none focus:border-border-strong transition-colors"
              placeholder="Buscar em todas as pastas..."
            />
          </div>
          <p className="text-[10px] font-bold text-text-3 uppercase tracking-widest mb-3">PASTAS</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {MAT_FOLDERS.map((f) => (
              <PortalCard key={f.id} lift>
                <button onClick={() => setFolder(f.id)} className="w-full p-5 flex items-center gap-3.5 text-left bg-transparent border-none cursor-pointer">
                  <span className="w-10 h-10 rounded-lg bg-surface-3 flex items-center justify-center text-text-3">
                    {FOLDER_ICONS[f.icon] || <FileIcon size={20} />}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-text-1">{f.label}</p>
                    <p className="text-[11px] text-text-3">{f.count} arquivos · {f.size}</p>
                  </div>
                </button>
              </PortalCard>
            ))}
          </div>
          <p className="text-[10px] font-bold text-text-3 uppercase tracking-widest mb-3">RECENTES</p>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {Object.values(FILES).flat().slice(0, 5).map((f, i) => <FileRow key={i} f={f} />)}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => { setFolder(null); setSearch(""); }} className="text-xs text-text-3 hover:text-text-1 bg-transparent border-none cursor-pointer font-semibold flex items-center gap-1">
              <ArrowLeft size={14} /> Voltar
            </button>
            <span className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center text-text-3">
              {fdata ? FOLDER_ICONS[fdata.icon] || <FileIcon size={16} /> : null}
            </span>
            <div>
              <p className="text-sm font-bold text-text-1">{fdata?.label}</p>
              <p className="text-[11px] text-text-3">{fdata?.count} arquivos</p>
            </div>
            <div className="flex-1" />
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-3" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="pl-7 pr-3 py-1.5 bg-surface-3 border border-border rounded-lg text-text-1 text-xs outline-none w-44"
              />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {files.map((f, i) => <FileRow key={i} f={f} />)}
          </div>
        </>
      )}
    </div>
  );
}
