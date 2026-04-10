import Image from "next/image"
import { MessageCircle, ArrowRight } from "lucide-react"
import { HeroNav } from "@/components/estou-em-dia/hero-nav"

const WA = "https://wa.me/5512991435465"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh w-full min-w-0 max-w-[100vw] flex-col overflow-x-clip bg-[#f4f4f4]"
      aria-label="Apresentação principal"
    >
      {/* Fundo refinado */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_100%_-20%,rgba(37,99,235,0.09),transparent_50%),radial-gradient(ellipse_90%_60%_at_0%_100%,rgba(74,222,128,0.06),transparent_45%),linear-gradient(180deg,#fafbfd_0%,#f4f4f4_38%,#eef2ff_100%)]"
        aria-hidden
      />

      <HeroNav />

      <div className="relative isolate min-h-0 w-full flex-1">
        {/* Desktop: imagem à direita */}
        <div className="pointer-events-none absolute bottom-0 left-[42%] right-0 top-0 z-[1] hidden min-w-0 md:block">
          <Image
            src="/img-hero.png"
            alt="Composição visual: pessoa com celular e elementos da marca Estou em dia"
            fill
            priority
            sizes="58vw"
            className="object-contain [object-position:right_bottom] [filter:drop-shadow(0_20px_48px_rgba(16,32,90,0.1))]"
          />
        </div>

        <div className="relative z-20 mx-auto grid min-h-full w-full min-w-0 max-w-[1320px] grid-cols-1 grid-rows-[auto_1fr] items-stretch gap-8 px-4 pt-8 pb-10 sm:gap-10 sm:px-6 sm:pt-9 sm:pb-12 md:grid-cols-[minmax(0,46%)_minmax(0,54%)] md:grid-rows-1 md:gap-0 md:px-6 md:pt-7 md:pb-8 lg:px-8 lg:pt-8 lg:pb-10 xl:px-10 xl:pt-10 xl:pb-12">
          <div className="flex min-h-0 min-w-0 flex-col items-center text-center md:items-start md:text-left md:justify-start md:min-h-full md:pb-10 md:pl-6 md:pr-6 md:pt-4 lg:pb-14 lg:pl-8 lg:pr-10 lg:pt-5 xl:pl-12 xl:pt-6">
            <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-[#1f47dd]/15 bg-white/70 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3d5cad] shadow-sm backdrop-blur-sm sm:px-4 sm:text-[12px]">
              <svg
                viewBox="0 0 24 24"
                className="size-[14px] shrink-0 text-[#1f47dd] sm:size-[15px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <span>De pessoas para pessoas</span>
            </div>

            <h1 className="mb-5 mt-5 max-w-[38rem] text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#10205a] sm:mb-6 sm:mt-6 md:mx-0">
              Você em dia para{" "}
              <span className="bg-gradient-to-r from-[#1f47dd] to-[#2563eb] bg-clip-text text-transparent">
                encontrar oportunidades financeiras
              </span>
            </h1>

            <p className="m-0 flex max-w-[28rem] flex-col items-center gap-3 text-[clamp(1.125rem,2.1vw,1.625rem)] leading-[1.35] text-[#1e2c5a] sm:flex-row sm:items-start md:mx-0">
              <span className="mt-0 flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1f47dd]/10 sm:mt-1 sm:size-11">
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 text-[#1f47dd] sm:size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M12 2 4 5v7c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V5l-8-3z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <span className="min-w-0">
                A sua nova opção para organizar sua vida financeira com segurança e transparência.
              </span>
            </p>

            <div className="mt-10 flex w-full max-w-xl justify-center sm:mt-12 md:justify-start">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#5ee984] to-[#4ADE80] px-8 py-3.5 text-base font-semibold text-[#052e16] shadow-[0_8px_32px_-8px_rgba(74,222,128,0.55)] transition hover:from-[#6aed8e] hover:to-[#3fcd70] sm:min-h-0 sm:px-10 sm:py-4"
              >
                <MessageCircle className="size-5 shrink-0" strokeWidth={2.25} />
                Falar no WhatsApp
                <ArrowRight className="size-4 opacity-80" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          <div className="relative min-h-[min(48svh,400px)] w-full md:min-h-full md:bg-transparent">
            <div className="relative mx-auto h-full min-h-[min(44svh,360px)] w-full max-w-lg md:hidden">
              <Image
                src="/img-hero.png"
                alt="Composição visual: pessoa com celular e elementos da marca Estou em dia"
                fill
                priority
                sizes="100vw"
                className="object-contain object-bottom [filter:drop-shadow(0_20px_48px_rgba(16,32,90,0.1))]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
