"use client"

import { Landmark } from "lucide-react"
import { SectionHeading } from "@/components/estou-em-dia/section-heading"
import { cn } from "@/lib/utils"
import { containerWide } from "@/lib/section-ui"

const steps = [
  {
    title: "Consulta",
    description: "Olhamos seu CPF, o que consta nos órgãos e o que dá pra atacar primeiro.",
  },
  {
    title: "Nome nos cadastros",
    description: "Foco em tirar o que não deveria estar ali e melhorar como você aparece.",
  },
  {
    title: "Dívidas em dia",
    description: "Negociação, parcelamento e baixa quando o acordo fecha.",
  },
  {
    title: "Parte jurídica",
    description: "Só entra advogado quando o caso pede — a gente te explica antes.",
  },
  {
    title: "Crédito de novo",
    description: "Objetivo: você voltar a pedir empréstimo ou cartão sem susto.",
  },
] as const

export function Process() {
  return (
    <section
      id="processo"
      className="relative scroll-mt-24 overflow-x-clip border-t border-white/15 bg-[#1a46e3] px-4 py-20 md:scroll-mt-28 md:px-6 md:py-24 lg:py-28"
    >
      <div className={cn(containerWide, "relative z-10")}>
        <SectionHeading
          variant="blue"
          align="center"
          eyebrow="Como funciona"
          title={
            <>
              Cinco passos até você{" "}
              <span className="text-[#4ADE80]">respirar de novo no crédito</span>
            </>
          }
          description="Nada de promessa milagrosa: a gente segue o que a lei permite e te mantém informado em cada etapa."
          className="mb-12 max-w-2xl md:mb-14"
        />

        <ul className="mx-auto grid max-w-6xl list-none grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 lg:grid-cols-6 lg:gap-x-6 lg:gap-y-6">
          {steps.map((step, index) => {
            const n = index + 1
            const isLast = index === steps.length - 1
            return (
              <li
                key={step.title}
                className={cn(
                  "flex min-h-0 min-w-0",
                  index <= 2 && "lg:col-span-2",
                  index === 3 && "lg:col-span-2 lg:col-start-2",
                  index === 4 && "sm:col-span-2 lg:col-span-2 lg:col-start-4",
                  isLast && "sm:justify-center",
                )}
              >
                <article
                  className={cn(
                    "relative mx-auto flex h-full w-full max-w-lg flex-col rounded-2xl border border-white/25 bg-white p-5 shadow-lg shadow-black/15 ring-1 ring-white/40 sm:max-w-none sm:mx-0 sm:p-6",
                    isLast && "sm:mx-auto sm:max-w-lg lg:mx-0 lg:max-w-none",
                  )}
                >
                  <div className="flex flex-1 items-start gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4ADE80] text-sm font-bold text-white shadow-sm"
                      aria-hidden
                    >
                      {n}
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3d5cad]">
                        Etapa {n} de {steps.length}
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-snug text-[#0F172A] sm:text-[1.125rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#1e2c5a]/85 sm:text-[15px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        <div className="mx-auto mt-14 max-w-3xl border-t border-white/10 pt-10 md:mt-16 md:pt-12 lg:max-w-none lg:px-2">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-start md:gap-12 lg:gap-16">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-emerald-400">
                <Landmark className="size-4 shrink-0 opacity-90" strokeWidth={1.75} aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400/95 sm:text-xs">
                  Cadastros e protestos
                </p>
              </div>
              <h3 className="mt-4 text-pretty text-xl font-semibold leading-[1.2] tracking-tight text-white sm:text-2xl md:text-[1.65rem] lg:text-[1.85rem]">
                Quando regulariza, isso aparece onde o banco{" "}
                <span className="text-[#4ADE80]">realmente olha</span>
              </h3>
            </div>
            <p className="min-w-0 text-[15px] leading-relaxed text-slate-400 md:pt-7 md:text-base lg:text-[1.05rem] lg:leading-relaxed">
              SPC, Serasa, cartório de protesto — o histórico precisa bater com a situação de hoje, não com o que ficou
              para trás.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
