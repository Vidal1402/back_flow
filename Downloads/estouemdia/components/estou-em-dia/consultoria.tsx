"use client"

import { ArrowLeftRight, Clock, PieChart, Wallet } from "lucide-react"
import { SectionHeading } from "@/components/estou-em-dia/section-heading"
import { cardMuted, container, sectionDark } from "@/lib/section-ui"
import { cn } from "@/lib/utils"

const items = [
  { icon: Wallet, text: "Buscar empréstimo e cartão com comparativo entre instituições." },
  { icon: ArrowLeftRight, text: "Ver ofertas lado a lado e escolher o que fecha com o seu bolso." },
  { icon: Clock, text: "Contratar online em poucos minutos, sem fila de banco." },
  { icon: PieChart, text: "Organizar o orçamento com planejamento financeiro junto." },
] as const

export function Consultoria() {
  return (
    <section id="consultoria" className={sectionDark}>
      <div className={cn(container, "relative z-10")}>
        <SectionHeading
          variant="dark"
          eyebrow="Crédito e planejamento"
          title={
            <>
              Consultoria em <span className="text-[#4ADE80]">rating bancário</span>
            </>
          }
          description="Ver onde você está no mercado, comparar opções e decidir com calma — sem letras miúdas escondidas."
          className="mb-10 max-w-2xl md:mb-12"
        />

        <ul className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4">
          {items.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className={cn(cardMuted, "flex min-w-0 gap-4 p-5 transition-colors hover:border-slate-600/60")}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-[#4ADE80]">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className="min-w-0 text-[15px] leading-relaxed text-slate-300">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
