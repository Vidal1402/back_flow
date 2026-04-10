"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { BRAND_LOGO_URL } from "@/components/estou-em-dia/brand-logo"
import { landingNavLinks } from "@/lib/landing-nav-links"
import { cn } from "@/lib/utils"

const links = landingNavLinks

const WA = "https://wa.me/5512991435465"

const SECTION_IDS = links.map((l) => l.href.slice(1))
const HEADER_OFFSET_PX = 96

function getActiveSectionId(): string {
  const y = window.scrollY
  let current = SECTION_IDS[0]
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (!el) continue
    const top = el.getBoundingClientRect().top + window.scrollY
    if (y + HEADER_OFFSET_PX >= top) {
      current = id
    }
  }
  return current
}

export function HeroNav() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const sync = () => {
      setActiveId((prev) => {
        const next = getActiveSectionId()
        return prev === next ? prev : next
      })
    }
    sync()
    window.addEventListener("scroll", sync, { passive: true })
    window.addEventListener("resize", sync)
    window.addEventListener("hashchange", sync)
    return () => {
      window.removeEventListener("scroll", sync)
      window.removeEventListener("resize", sync)
      window.removeEventListener("hashchange", sync)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full max-w-[100vw] overflow-x-hidden border-b border-slate-800/80 bg-[#0F172A] shadow-sm shadow-black/10">
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 py-1 opacity-95 transition-opacity hover:opacity-100"
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">Estou em Dia — início</span>
          <Image
            src={BRAND_LOGO_URL}
            alt=""
            width={200}
            height={80}
            className="h-9 w-auto object-contain object-left sm:h-10"
            priority
          />
        </Link>

        <nav className="hidden flex-1 justify-center md:flex" aria-label="Principal">
          <ul className="flex flex-wrap items-center justify-center gap-x-1 lg:gap-x-2">
            {links.map((item) => {
              const id = item.href.slice(1)
              const isActive = activeId === id
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors lg:px-3.5",
                      isActive
                        ? "font-medium text-white"
                        : "text-slate-400 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-[#4ADE80] px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-[#3fcd70] md:inline-flex"
          >
            <MessageCircle className="size-4" strokeWidth={2} />
            <span className="hidden sm:inline">Fale no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-800 md:hidden">
          <nav className="mx-auto max-w-[1200px] px-4 pb-6 pt-2" aria-label="Principal mobile">
            <ul className="divide-y divide-slate-800/90">
              {links.map((item) => {
                const id = item.href.slice(1)
                const isActive = activeId === id
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "block py-3.5 text-[15px] transition-colors",
                        isActive ? "font-medium text-white" : "text-slate-400 hover:text-white",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#4ADE80] py-3.5 text-sm font-medium text-slate-950 hover:bg-[#3fcd70]"
            >
              <MessageCircle className="size-4" strokeWidth={2} />
              Fale no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
