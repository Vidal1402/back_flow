import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { VisaoGeralPage } from "./pages/VisaoGeralPage";
import { ClientesPage } from "./pages/ClientesPage";
import { ProducaoAdminPage } from "./pages/ProducaoAdminPage";
import { ColaboradoresPage } from "./pages/ColaboradoresPage";
import { FinanceiroAdminPage } from "./pages/FinanceiroAdminPage";
import { ProdutosPlanosPage } from "./pages/ProdutosPlanosPage";
import { ComercialPage } from "./pages/ComercialPage";
import { AlertasPage } from "./pages/AlertasPage";
import { RelatoriosAdminPage } from "./pages/RelatoriosAdminPage";
import { ConfigAdminPage } from "./pages/ConfigAdminPage";
import { useAuth } from "@/hooks/useAuth";

export function AdminLayout() {
  const [page, setPage] = useState("visao-geral");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar
        page={page}
        setPage={setPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={signOut}
      />
      <main className="flex-1 min-h-screen overflow-y-auto">
        <AdminTopbar onMenuClick={() => setMobileOpen(true)} />
        <div className="p-4 md:p-6 lg:p-8">
          {page === "visao-geral" && <VisaoGeralPage />}
          {page === "clientes" && <ClientesPage />}
          {page === "producao" && <ProducaoAdminPage />}
          {page === "colaboradores" && <ColaboradoresPage />}
          {page === "financeiro" && <FinanceiroAdminPage />}
          {page === "produtos" && <ProdutosPlanosPage />}
          {page === "comercial" && <ComercialPage />}
          {page === "alertas" && <AlertasPage />}
          {page === "relatorios" && <RelatoriosAdminPage />}
          {page === "config" && <ConfigAdminPage />}
        </div>
      </main>
    </div>
  );
}
