"use client"

import { ShieldCheck } from "lucide-react"
import { SectionHeading } from "@/components/estou-em-dia/section-heading"
import { cardMuted, container, sectionDark } from "@/lib/section-ui"
import { cn } from "@/lib/utils"

export function Garantia() {
  return (
    <section id="garantia" className={sectionDark}>
      <div className={container}>
        <SectionHeading
          variant="dark"
          eyebrow="Garantia"
          title={
            <>
              Satisfação garantida ou <span className="text-[#4ADE80]">dinheiro de volta</span>
            </>
          }
          description="Se não cumprirmos o combinado, devolvemos 100% do valor."
          className="mb-10 max-w-xl"
        />

        <div className={cn(cardMuted, "mx-auto max-w-2xl p-8 text-center md:p-10")}>
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-[#4ADE80] px-5 py-2.5 text-sm font-bold text-[#0F172A]">
            <ShieldCheck className="h-5 w-5" strokeWidth={2} />
            Risco zero pra você
          </div>
          <p className="text-lg leading-relaxed text-slate-200 md:text-xl">
            Seu nome limpo ou{" "}
            <span className="font-semibold text-[#4ADE80]">devolvemos 100% do que você pagou</span> — centavo por
            centavo, sem letras miúdas.
          </p>
        </div>
      </div>
    </section>
  )
}
