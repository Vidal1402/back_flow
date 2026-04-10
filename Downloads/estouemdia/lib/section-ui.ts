/** Classes compartilhadas — seções após o hero/benefícios */
const sectionBase =
  "w-full min-w-0 max-w-[100vw] overflow-x-clip scroll-mt-24 border-t border-white/[0.06] px-4 py-20 md:scroll-mt-28 md:px-6 md:py-24 lg:py-28"

const sectionBaseLight =
  "w-full min-w-0 max-w-[100vw] overflow-x-clip scroll-mt-24 border-t border-slate-200 bg-white px-4 py-20 md:scroll-mt-28 md:px-6 md:py-24 lg:py-28"

export const sectionDark = `${sectionBase} bg-[#0F172A]`

export const sectionBlue = `${sectionBase} bg-[#152238]`

/** Azul médio — destaque sem neon */
export const sectionProtege = `${sectionBase} bg-[#1a365d]`

/** Fundo branco — alternância com seções azuis */
export const sectionLight = sectionBaseLight

export const container = "mx-auto w-full min-w-0 max-w-5xl"

export const containerWide = "mx-auto w-full min-w-0 max-w-6xl"

export const cardMuted = "rounded-2xl border border-slate-700/50 bg-slate-800/35 backdrop-blur-sm"

/** Cartões em seção clara */
export const cardLight =
  "rounded-2xl border border-slate-200 bg-slate-50/90 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
