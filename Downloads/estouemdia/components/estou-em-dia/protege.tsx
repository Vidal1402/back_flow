"use client"

import Image from "next/image"
import { Bell, Shield, ShieldCheck } from "lucide-react"
import { cardLight, sectionLight } from "@/lib/section-ui"
import { cn } from "@/lib/utils"

export function Protege() {
  return (
    <section id="protege" className={sectionLight}>
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
          {/* Coluna esquerda — conteúdo */}
          <div className="min-w-0 text-center md:order-1 md:text-left">
            <p className="text-sm font-semibold text-emerald-600">Protege</p>

            <h2 className="mt-3 text-2xl font-bold leading-snug text-slate-900 md:text-[1.65rem] lg:text-[1.75rem]">
              Depois que o nome limpa, ainda pode aparecer coisa errada de novo. Esse serviço é pra você não levar susto.
            </h2>

            <div className={cn(cardLight, "mt-8 min-w-0 p-6 text-left md:mt-10 md:p-8")}>
              <div className="flex min-w-0 gap-4 md:gap-5">
                <Shield className="mt-0.5 h-8 w-8 shrink-0 text-emerald-600" strokeWidth={1.75} aria-hidden />
                <div className="min-w-0 space-y-3 text-[15px] leading-relaxed text-slate-700">
                  <p>
                    A gente fica de olho em sinais de novo apontamento no seu{" "}
                    <strong className="font-semibold text-slate-900">CPF</strong> ou{" "}
                    <strong className="font-semibold text-slate-900">CNPJ</strong> e te avisa antes de virar dor de
                    cabeça de novo.
                  </p>
                  <p className="text-slate-600">
                    Não é milagre: é acompanhamento. Se algo fugir do combinado, você sabe na hora.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm text-slate-500 md:text-left">
              Dúvida se isso vale pra você? Chama no WhatsApp e pergunta sem vergonha.
            </p>
          </div>

          {/* Coluna direita — imagem + cards flutuantes (estilo benefícios) */}
          <div className="relative mx-auto w-full max-w-md min-w-0 md:order-2 md:mx-0 md:max-w-none md:-mx-2 lg:mx-0">
            {/* Card superior — “proteção ativa” (similar ao score dos benefícios) */}
            <div className="absolute left-3 top-3 z-10 max-w-[min(100%,220px)] rounded-xl bg-white p-3 shadow-lg sm:left-4 sm:top-4 sm:max-w-none sm:p-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-2 ring-emerald-100">
                  <ShieldCheck className="h-7 w-7 text-emerald-600" strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="text-xs font-medium text-slate-700">Monitoramento</p>
                  <p className="text-sm font-semibold text-[#4ADE80]">ativo no seu CPF</p>
                </div>
              </div>
            </div>

            {/* Card lateral — alertas (chip) */}
            <div className="absolute right-2 top-[34%] z-10 rounded-xl border border-slate-100 bg-white px-2.5 py-2 shadow-lg sm:right-3 sm:top-[38%] sm:px-4 sm:py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Alertas</p>
              <p className="mt-0.5 flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#4ADE80] text-xs font-bold text-white">
                  0
                </span>
                pendentes
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/img-protege.png"
                alt="Mulher sorrindo, em ambiente interno acolhedor"
                width={800}
                height={1000}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-auto w-full min-h-[300px] object-cover object-center sm:min-h-[380px] md:min-h-[min(68vh,500px)] lg:min-h-[min(74vh,560px)]"
              />
            </div>

            {/* Barra inferior — estilo notificação dos benefícios */}
            <div className="absolute bottom-3 left-3 right-3 z-10 flex min-w-0 items-center gap-2 rounded-full bg-white px-3 py-2.5 shadow-lg sm:bottom-4 sm:left-4 sm:right-4 sm:gap-3 sm:px-4 sm:py-3">
              <Bell className="h-5 w-5 shrink-0 text-[#2563EB]" aria-hidden />
              <span className="min-w-0 text-left text-xs font-medium text-[#0F172A] sm:text-sm">
                Cadastros monitorados — avisamos se algo mudar
              </span>
              <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4ADE80] text-[10px] font-bold text-white">
                ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
