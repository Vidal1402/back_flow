"use client"

import { Phone, Instagram, MessageCircle, ChevronRight } from "lucide-react"

const WA = "https://wa.me/5512991435465"
const TEL = "tel:+5512991435465"

export function Contato() {
  return (
    <section
      id="contato"
      className="relative w-full min-w-0 max-w-[100vw] scroll-mt-24 overflow-x-clip border-t border-slate-200 bg-white pb-8 pt-20 md:scroll-mt-28 md:pb-10 md:pt-28"
    >
      <div className="mx-auto w-full min-w-0 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 lg:items-start">
          <header className="text-center lg:col-span-5 lg:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600 sm:text-xs">Contato</p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-[2.65rem]">
              Bora conversar?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-slate-600 lg:mx-0">
              Escolhe o canal que for mais fácil. A gente atende por WhatsApp, ligação e posta novidades no Instagram.
            </p>
            <div className="mx-auto mt-10 max-w-md border-l-2 border-emerald-500 pl-5 text-left lg:mx-0">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">A meta</p>
              <p className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                estou em <span className="text-emerald-600">dia!</span>
              </p>
            </div>
          </header>

          <div className="min-w-0 lg:col-span-7">
            <p className="mb-3 text-center text-sm text-slate-500 lg:text-left">Canais diretos</p>
            <nav
              aria-label="Formas de contato"
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
            >
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border-b border-slate-200 bg-emerald-600 px-4 py-4 text-white transition-colors hover:bg-emerald-700 sm:px-5 sm:py-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <MessageCircle className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">WhatsApp</span>
                  <span className="mt-0.5 block text-base font-semibold tabular-nums sm:text-lg">(12) 99143-5465</span>
                </span>
                <ChevronRight
                  className="h-5 w-5 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>

              <a
                href={TEL}
                className="group flex items-center gap-4 border-b border-slate-200 px-4 py-4 transition-colors hover:bg-slate-50 sm:px-5 sm:py-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
                  <Phone className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-xs text-slate-500">Telefone</span>
                  <span className="font-medium text-slate-900">Ligar agora</span>
                </span>
                <ChevronRight
                  className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400"
                  aria-hidden
                />
              </a>

              <a
                href="https://instagram.com/estou.em.dia"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-slate-50 sm:px-5 sm:py-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
                  <Instagram className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-xs text-slate-500">Instagram</span>
                  <span className="font-medium text-slate-900">@estou.em.dia</span>
                </span>
                <ChevronRight
                  className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400"
                  aria-hidden
                />
              </a>
            </nav>

            <p className="mt-4 text-center text-xs leading-relaxed text-slate-500 lg:text-left">
              Segunda a sexta, horário comercial. Fora disso, manda no Zap que a gente vê quando abrir.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
