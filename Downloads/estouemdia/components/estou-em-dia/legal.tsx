"use client"

import { BookOpen, ListOrdered } from "lucide-react"
import { SectionHeading } from "@/components/estou-em-dia/section-heading"
import { cn } from "@/lib/utils"
import { cardLight, containerWide, sectionLight } from "@/lib/section-ui"

export function Legal() {
  const steps = [
    {
      number: "1º",
      title: "Diagnóstico",
      description: "A gente vê suas dívidas e o que dá pra resolver sem enrolação.",
    },
    {
      number: "2º",
      title: "Proposta",
      description: "Com a documentação em ordem, você recebe a proposta de pagamento.",
    },
    {
      number: "3º",
      title: "Liberação nos órgãos",
      description: "Em cerca de 30 a 45 dias, tratamos os apontamentos nos cadastros de crédito.",
    },
    {
      number: "4º",
      title: "Crédito de novo",
      description: "Nome regularizado para você voltar a negociar com banco e loja.",
    },
  ]

  return (
    <section id="cases" className={sectionLight}>
      <div className={cn(containerWide, "relative z-10")}>
        <SectionHeading
          variant="light"
          align="center"
          eyebrow="Lei e transparência"
          title={
            <>
              Seu direito no papel,{" "}
              <span className="text-emerald-600">o passo a passo na prática</span>
            </>
          }
          description="O Código de Defesa do Consumidor vale para cobrança abusiva — e a gente segue um fluxo claro para te ajudar."
          className="mb-12 max-w-2xl md:mb-14"
        />

        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
          <div className={cn(cardLight, "p-8 text-center md:p-9 md:text-left")}>
            <div className="mb-5 flex justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-800">
                <BookOpen className="h-4 w-4 text-emerald-600" strokeWidth={2} />
                CDC
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600">Artigo que nos respalda</h3>
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Lei nº 8.078</p>

            <blockquote className="mt-6 border-0 pl-0 md:border-l-[3px] md:border-emerald-500 md:pl-5">
              <p className="text-[15px] leading-relaxed text-slate-800 md:text-base">
                <span className="font-semibold text-emerald-700">Art. 42.</span> Na cobrança de débitos, o consumidor
                inadimplente não será exposto a ridículo, nem será submetido a qualquer tipo de constrangimento ou
                ameaça.
              </p>
            </blockquote>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              Cobrança tem limite: respeito ao consumidor vem antes de pressão ou exposição.
            </p>
          </div>

          <div className="min-w-0">
            <div className="mb-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:text-left md:items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <ListOrdered className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Na ordem</p>
                <h3 className="text-lg font-bold text-slate-900 md:text-xl">Como a gente trabalha</h3>
              </div>
            </div>

            <ol className="space-y-3">
              {steps.map((step) => (
                <li key={step.title} className={cn(cardLight, "p-4 md:p-5")}>
                  <div className="flex gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                      aria-hidden
                    >
                      {step.number}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h4 className="font-semibold text-slate-900">{step.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
