import Link from "next/link"
import { Instagram } from "lucide-react"
import { BrandLogo } from "@/components/estou-em-dia/brand-logo"

const quickLinks = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como funciona", href: "#processo" },
  { label: "Transparência", href: "#cases" },
  { label: "Consultoria", href: "#consultoria" },
  { label: "Garantia", href: "#garantia" },
  { label: "Contato", href: "#contato" },
] as const

export function Footer() {
  return (
    <footer className="w-full min-w-0 max-w-[100vw] overflow-x-clip border-t border-slate-800 bg-[#0F172A]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-3 lg:items-start">
          <div className="flex flex-col items-center sm:items-start">
            <BrandLogo variant="footer" className="mx-auto object-center sm:mx-0 sm:object-left" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              A sua nova opção para organizar sua vida financeira.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Navegação</h4>
            <nav className="mt-4 flex flex-col gap-2.5" aria-label="Rodapé">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-white/55 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-sm font-semibold text-white">Redes e telefone</h4>
            <a
              href="https://instagram.com/estou.em.dia"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 text-sm text-white/55 transition-colors hover:text-white sm:justify-start"
            >
              <Instagram className="h-4 w-4 shrink-0" aria-hidden />
              @estou.em.dia
            </a>
            <p className="mt-3 text-sm text-white/55">
              WhatsApp:{" "}
              <a href="tel:+5512991435465" className="text-emerald-400 transition-colors hover:text-emerald-300">
                (12) 99143-5465
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Estou em Dia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
